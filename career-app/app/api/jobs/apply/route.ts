import { type NextRequest, NextResponse } from "next/server"
import { verifyAuth } from "@/lib/auth"
import { createApplication } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { jobId, jobTitle, company, location, source, url, coverLetter } = await request.json()

    if (!jobId || !jobTitle || !company) {
      return NextResponse.json({ error: "Job ID, title, and company are required" }, { status: 400 })
    }

    // Create application record
    const application = await createApplication({
      userId: user.userId,
      jobId,
      jobTitle,
      company,
      location: location || null,
      source: source || null,
      url: url || null,
      coverLetter: coverLetter || null,
      status: "applied",
      appliedAt: new Date(),
    })

    return NextResponse.json({
      success: true,
      application,
      message: "Application submitted successfully",
    })
  } catch (error) {
    console.error("Apply to job error:", error)
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 })
  }
}
