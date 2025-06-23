import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { xai } from "@ai-sdk/xai"
import { verifyAuth } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { jobDescription, resumeText, companyName, jobTitle } = await request.json()

    if (!jobDescription || !resumeText) {
      return NextResponse.json({ error: "Job description and resume text are required" }, { status: 400 })
    }

    const prompt = `
Generate a professional, personalized cover letter based on the following information:

Job Title: ${jobTitle || "Not specified"}
Company: ${companyName || "Not specified"}

Job Description:
${jobDescription}

Candidate's Resume/Background:
${resumeText}

Instructions:
1. Create a compelling cover letter that highlights relevant experience from the resume
2. Match the candidate's skills to the job requirements
3. Show enthusiasm for the specific role and company
4. Keep it professional but personable
5. Aim for 3-4 paragraphs, around 300-400 words
6. Don't include placeholder text like [Your Name] - make it ready to use
7. Focus on specific achievements and skills that align with the job

Generate only the cover letter content, no additional formatting or explanations.
`

    const { text } = await generateText({
      model: xai("grok-3"),
      prompt,
      maxTokens: 800,
    })

    return NextResponse.json({
      success: true,
      coverLetter: text.trim(),
    })
  } catch (error) {
    console.error("Cover letter generation error:", error)
    return NextResponse.json({ error: "Failed to generate cover letter" }, { status: 500 })
  }
}
