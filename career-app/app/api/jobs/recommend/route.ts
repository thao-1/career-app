import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { xai } from "@ai-sdk/xai"
import { verifyAuth } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { resumeText, preferences } = await request.json()

    if (!resumeText) {
      return NextResponse.json({ error: "Resume text is required" }, { status: 400 })
    }

    const prompt = `
Analyze this resume and provide job recommendations:

Resume:
${resumeText}

User Preferences:
${preferences ? JSON.stringify(preferences) : "No specific preferences"}

Based on the resume, recommend 5 job titles that would be a good fit. For each recommendation, provide:
1. Job title
2. Why it's a good match (2-3 sentences)
3. Key skills from resume that align
4. Estimated match percentage

Format as JSON array with objects containing: title, match_reason, aligned_skills, match_percentage
`

    const { text } = await generateText({
      model: xai("grok-3"),
      prompt,
      maxTokens: 1000,
    })

    try {
      const recommendations = JSON.parse(text)
      return NextResponse.json({
        success: true,
        recommendations,
      })
    } catch (parseError) {
      // If JSON parsing fails, return raw text
      return NextResponse.json({
        success: true,
        recommendations: text,
      })
    }
  } catch (error) {
    console.error("Job recommendation error:", error)
    return NextResponse.json({ error: "Failed to generate job recommendations" }, { status: 500 })
  }
}
