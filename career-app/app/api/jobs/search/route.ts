import { type NextRequest, NextResponse } from "next/server"
import { verifyAuth } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    // Verify authentication (optional - you might want to allow public search)
    const user = await verifyAuth(request)

    const { searchParams } = new URL(request.url)
    const query = searchParams.get("query") || ""
    const location = searchParams.get("location") || ""
    const page = Number.parseInt(searchParams.get("page") || "1")
    const jobType = searchParams.get("jobType") || ""
    const experienceLevel = searchParams.get("experienceLevel") || ""
    const datePosted = searchParams.get("datePosted") || ""
    const salaryRange = searchParams.get("salaryRange") || ""
    const remote = searchParams.get("remote") === "true"

    if (!query.trim()) {
      return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
    }

    // Call JSearch API
    const jsearchResponse = await searchJSearchAPI({
      query,
      location,
      page,
      jobType,
      experienceLevel,
      datePosted,
      salaryRange,
      remote,
    })

    return NextResponse.json({
      success: true,
      jobs: jsearchResponse.jobs,
      total: jsearchResponse.total,
      page: page,
      hasMore: jsearchResponse.hasMore,
    })
  } catch (error) {
    console.error("Job search error:", error)
    return NextResponse.json({ error: "Failed to search jobs" }, { status: 500 })
  }
}

async function searchJSearchAPI(params: {
  query: string
  location: string
  page: number
  jobType: string
  experienceLevel: string
  datePosted: string
  salaryRange: string
  remote: boolean
}) {
  const { query, location, page, jobType, experienceLevel, datePosted, salaryRange, remote } = params

  // Build JSearch API parameters
  const jsearchParams = new URLSearchParams({
    query: query,
    page: page.toString(),
    num_pages: "1",
  })

  if (location) jsearchParams.append("location", location)
  if (jobType) jsearchParams.append("employment_types", jobType.toUpperCase())
  if (experienceLevel) jsearchParams.append("job_requirements", experienceLevel)
  if (datePosted) jsearchParams.append("date_posted", datePosted)
  if (remote) jsearchParams.append("remote_jobs_only", "true")

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.JSEARCH_API_KEY || "",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  }

  try {
    const response = await fetch(`https://jsearch.p.rapidapi.com/search?${jsearchParams}`, options)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(`JSearch API error: ${data.message || "Unknown error"}`)
    }

    // Transform JSearch response to our format
    const transformedJobs =
      data.data?.map((job: any) => ({
        id: job.job_id || Math.random().toString(36).substr(2, 9),
        title: job.job_title || "No title",
        company: job.employer_name || "Unknown Company",
        location: job.job_city && job.job_state ? `${job.job_city}, ${job.job_state}` : job.job_country || "Remote",
        description: job.job_description || "No description available",
        salary:
          job.job_min_salary && job.job_max_salary
            ? `$${job.job_min_salary?.toLocaleString()} - $${job.job_max_salary?.toLocaleString()}`
            : job.job_salary || null,
        type: job.job_employment_type || "Full-time",
        posted: job.job_posted_at_datetime_utc ? formatTimeAgo(new Date(job.job_posted_at_datetime_utc)) : "Recently",
        source: job.job_publisher || "Job Board",
        url: job.job_apply_link || job.job_google_link || "#",
        logo: job.employer_logo || null,
        requirements: job.job_required_skills || [],
        benefits: job.job_benefits || [],
        remote: job.job_is_remote || false,
        experience_level: job.job_required_experience?.required_experience_in_months
          ? getExperienceLevel(job.job_required_experience.required_experience_in_months)
          : null,
      })) || []

    return {
      jobs: transformedJobs,
      total: data.num_results || 0,
      hasMore: page * 10 < (data.num_results || 0),
    }
  } catch (error) {
    console.error("JSearch API error:", error)

    // Return mock data for development/testing
    return getMockJobs(params)
  }
}

function formatTimeAgo(date: Date): string {
  const now = new Date()
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

  if (diffInHours < 1) return "Just posted"
  if (diffInHours < 24) return `${diffInHours}h ago`

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) return `${diffInDays}d ago`

  const diffInWeeks = Math.floor(diffInDays / 7)
  if (diffInWeeks < 4) return `${diffInWeeks}w ago`

  return `${Math.floor(diffInWeeks / 4)}mo ago`
}

function getExperienceLevel(months: number): string {
  if (months <= 12) return "Entry Level"
  if (months <= 36) return "Mid Level"
  if (months <= 60) return "Senior Level"
  return "Lead/Principal"
}

// Mock data for development/testing
function getMockJobs(params: any) {
  const mockJobs = [
    {
      id: "1",
      title: "Senior Software Engineer",
      company: "TechCorp Inc",
      location: "San Francisco, CA",
      description:
        "We are looking for a Senior Software Engineer to join our team and help build the next generation of our platform. You'll work with React, Node.js, and AWS to create scalable solutions.",
      salary: "$150,000 - $200,000",
      type: "Full-time",
      posted: "2d ago",
      source: "LinkedIn",
      url: "https://example.com/job1",
      logo: "/placeholder.svg?height=48&width=48",
      requirements: ["React", "Node.js", "TypeScript", "AWS", "5+ years experience"],
      benefits: ["Health Insurance", "401k", "Remote Work", "Unlimited PTO"],
      remote: false,
      experience_level: "Senior Level",
    },
    {
      id: "2",
      title: "Frontend Developer",
      company: "StartupXYZ",
      location: "Remote",
      description:
        "Join our fast-growing startup as a Frontend Developer. You'll be responsible for creating beautiful, responsive user interfaces using modern web technologies.",
      salary: "$90,000 - $130,000",
      type: "Full-time",
      posted: "1d ago",
      source: "Indeed",
      url: "https://example.com/job2",
      logo: "/placeholder.svg?height=48&width=48",
      requirements: ["React", "JavaScript", "CSS", "HTML", "3+ years experience"],
      benefits: ["Equity", "Health Insurance", "Remote Work"],
      remote: true,
      experience_level: "Mid Level",
    },
    {
      id: "3",
      title: "Product Manager",
      company: "BigTech Corp",
      location: "Seattle, WA",
      description:
        "We're seeking a Product Manager to drive product strategy and execution for our consumer-facing applications. You'll work closely with engineering, design, and business teams.",
      salary: "$140,000 - $180,000",
      type: "Full-time",
      posted: "3d ago",
      source: "Glassdoor",
      url: "https://example.com/job3",
      logo: "/placeholder.svg?height=48&width=48",
      requirements: ["Product Management", "Analytics", "SQL", "5+ years experience"],
      benefits: ["Stock Options", "Health Insurance", "Gym Membership"],
      remote: false,
      experience_level: "Senior Level",
    },
    {
      id: "4",
      title: "Full Stack Developer",
      company: "InnovateLabs",
      location: "Austin, TX",
      description:
        "Looking for a Full Stack Developer to work on exciting projects using cutting-edge technologies. You'll have the opportunity to work on both frontend and backend systems.",
      salary: "$110,000 - $150,000",
      type: "Full-time",
      posted: "1w ago",
      source: "AngelList",
      url: "https://example.com/job4",
      logo: "/placeholder.svg?height=48&width=48",
      requirements: ["React", "Node.js", "Python", "PostgreSQL", "4+ years experience"],
      benefits: ["Flexible Hours", "Health Insurance", "Learning Budget"],
      remote: false,
      experience_level: "Mid Level",
    },
    {
      id: "5",
      title: "DevOps Engineer",
      company: "CloudFirst Solutions",
      location: "Remote",
      description:
        "Join our DevOps team to help build and maintain our cloud infrastructure. You'll work with Kubernetes, Docker, and various cloud platforms to ensure scalability and reliability.",
      salary: "$130,000 - $170,000",
      type: "Full-time",
      posted: "4d ago",
      source: "Stack Overflow Jobs",
      url: "https://example.com/job5",
      logo: "/placeholder.svg?height=48&width=48",
      requirements: ["Kubernetes", "Docker", "AWS", "Terraform", "CI/CD"],
      benefits: ["Remote Work", "Health Insurance", "Conference Budget"],
      remote: true,
      experience_level: "Senior Level",
    },
  ]

  // Filter mock jobs based on search parameters
  let filteredJobs = mockJobs

  if (params.query) {
    filteredJobs = filteredJobs.filter(
      (job) =>
        job.title.toLowerCase().includes(params.query.toLowerCase()) ||
        job.company.toLowerCase().includes(params.query.toLowerCase()) ||
        job.description.toLowerCase().includes(params.query.toLowerCase()),
    )
  }

  if (params.location && params.location !== "Remote") {
    filteredJobs = filteredJobs.filter((job) => job.location.toLowerCase().includes(params.location.toLowerCase()))
  }

  if (params.remote) {
    filteredJobs = filteredJobs.filter((job) => job.remote)
  }

  if (params.jobType) {
    filteredJobs = filteredJobs.filter((job) => job.type.toLowerCase() === params.jobType.toLowerCase())
  }

  return {
    jobs: filteredJobs,
    total: filteredJobs.length,
    hasMore: false,
  }
}
