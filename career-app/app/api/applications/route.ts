import { type NextRequest, NextResponse } from "next/server"
import { verifyAuth } from "@/lib/auth"
import { createApplication, getUserApplications } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const applications = await getUserApplications(user.userId)

    return NextResponse.json({
      success: true,
      applications,
    })
  } catch (error) {
    console.error("Get applications error:", error)
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { jobId, jobTitle, company, location, coverLetter, resumeUsed } = await request.json()

    if (!jobId || !jobTitle || !company) {
      return NextResponse.json({ error: "Job ID, title, and company are required" }, { status: 400 })
    }

    const application = await createApplication({
      userId: user.userId,
      jobId,
      jobTitle,
      company,
      location: location || null,
      coverLetter: coverLetter || null,
      resumeUsed: resumeUsed || null,
      status: "pending",
      appliedAt: new Date()
    })

    return NextResponse.json({
      success: true,
      application,
    })
  } catch (error) {
    console.error("Create application error:", error)
    return NextResponse.json({ error: "Failed to create application" }, { status: 500 })
  }
}
