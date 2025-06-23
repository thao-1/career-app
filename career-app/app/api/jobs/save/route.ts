import { type NextRequest, NextResponse } from "next/server"
import { verifyAuth } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { jobId, jobData } = await request.json()

    if (!jobId) {
      return NextResponse.json({ error: "Job ID is required" }, { status: 400 })
    }

    // Save job to user's saved jobs
    // In a real implementation, you'd save this to your database
    // For now, we'll just return success

    return NextResponse.json({
      success: true,
      message: "Job saved successfully",
    })
  } catch (error) {
    console.error("Save job error:", error)
    return NextResponse.json({ error: "Failed to save job" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const jobId = searchParams.get("jobId")

    if (!jobId) {
      return NextResponse.json({ error: "Job ID is required" }, { status: 400 })
    }

    // Remove job from user's saved jobs
    // In a real implementation, you'd remove this from your database

    return NextResponse.json({
      success: true,
      message: "Job removed from saved jobs",
    })
  } catch (error) {
    console.error("Remove saved job error:", error)
    return NextResponse.json({ error: "Failed to remove saved job" }, { status: 500 })
  }
}
