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

    const { resumeText, targetJobTitle } = await request.json()

    if (!resumeText) {
      return NextResponse.json({ error: "Resume text is required" }, { status: 400 })
    }

    const prompt = `
Analyze and optimize this resume for better job search results:

Current Resume:
${resumeText}

Target Job Title: ${targetJobTitle || "General optimization"}

Provide optimization suggestions in the following format:
1. Overall Score (1-10)
2. Strengths (what's working well)
3. Areas for Improvement (specific issues)
4. Keyword Suggestions (missing important keywords)
5. Formatting Recommendations
6. Content Improvements

Be specific and actionable in your recommendations.
`

    const { text } = await generateText({
      model: xai("grok-3"),
      prompt,
      maxTokens: 1200,
    })

    return NextResponse.json({
      success: true,
      optimization: text,
    })
  } catch (error) {
    console.error("Resume optimization error:", error)
    return NextResponse.json({ error: "Failed to optimize resume" }, { status: 500 })
  }
}
