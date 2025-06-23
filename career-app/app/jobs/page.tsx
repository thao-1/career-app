"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  MapPin,
  Clock,
  Building2,
  DollarSign,
  Filter,
  ExternalLink,
  Briefcase,
  Users,
  Heart,
  Share2,
  Code2,
} from "lucide-react"
import Link from "next/link"

interface Job {
  id: string
  title: string
  company: string
  location: string
  description: string
  salary?: string
  type: string
  posted: string
  source: string
  url: string
  logo?: string
  requirements?: string[]
  benefits?: string[]
  remote?: boolean
  experience_level?: string
}

export default function JobSearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [location, setLocation] = useState("")
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    jobType: "",
    experienceLevel: "",
    datePosted: "",
    salaryRange: "",
    remote: false,
  })
  const [savedJobs, setSavedJobs] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalJobs, setTotalJobs] = useState(0)

  const searchJobs = async (page = 1) => {
    if (!searchQuery.trim()) return

    setLoading(true)
    try {
      const params = new URLSearchParams({
        query: searchQuery,
        location: location,
        page: page.toString(),
        ...filters,
      })

      const response = await fetch(`/api/jobs/search?${params}`)
      const data = await response.json()

      if (data.success) {
        if (page === 1) {
          setJobs(data.jobs)
        } else {
          setJobs((prev) => [...prev, ...data.jobs])
        }
        setTotalJobs(data.total)
        setCurrentPage(page)
      }
    } catch (error) {
      console.error("Search error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1)
    searchJobs(1)
  }

  const loadMore = () => {
    searchJobs(currentPage + 1)
  }

  const toggleSaveJob = (jobId: string) => {
    setSavedJobs((prev) => (prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]))
  }

  const applyToJob = async (job: Job) => {
    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId: job.id,
          jobTitle: job.title,
          company: job.company,
          location: job.location,
          source: job.source,
          url: job.url,
        }),
      })

      if (response.ok) {
        // Show success message or redirect
        window.open(job.url, "_blank")
      }
    } catch (error) {
      console.error("Apply error:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <Link href="/" className="text-2xl font-bold text-gray-900">
                CareerHack
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="outline">Dashboard</Button>
              </Link>
              <Link href="/applications">
                <Button variant="outline">My Applications</Button>
              </Link>
            </div>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="search">Job Title, Keywords, or Company</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="search"
                    type="text"
                    placeholder="e.g., Software Engineer, Product Manager, React Developer"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="location"
                    type="text"
                    placeholder="e.g., San Francisco, Remote, New York"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 items-end">
              <div className="flex-1 min-w-[200px]">
                <Label>Job Type</Label>
                <Select
                  value={filters.jobType}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, jobType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 min-w-[200px]">
                <Label>Experience Level</Label>
                <Select
                  value={filters.experienceLevel}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, experienceLevel: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="entry">Entry Level</SelectItem>
                    <SelectItem value="mid">Mid Level</SelectItem>
                    <SelectItem value="senior">Senior Level</SelectItem>
                    <SelectItem value="lead">Lead/Principal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 min-w-[200px]">
                <Label>Date Posted</Label>
                <Select
                  value={filters.datePosted}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, datePosted: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any time</SelectItem>
                    <SelectItem value="1">Past 24 hours</SelectItem>
                    <SelectItem value="3">Past 3 days</SelectItem>
                    <SelectItem value="7">Past week</SelectItem>
                    <SelectItem value="14">Past 2 weeks</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" disabled={loading} className="bg-yellow-500 hover:bg-yellow-600 text-white">
                {loading ? "Searching..." : "Search Jobs"}
              </Button>
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Salary Range</Label>
                  <Select
                    value={filters.salaryRange}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, salaryRange: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="40000-60000">$40k - $60k</SelectItem>
                      <SelectItem value="60000-80000">$60k - $80k</SelectItem>
                      <SelectItem value="80000-100000">$80k - $100k</SelectItem>
                      <SelectItem value="100000-150000">$100k - $150k</SelectItem>
                      <SelectItem value="150000+">$150k+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remote"
                    checked={filters.remote}
                    onChange={(e) => setFilters((prev) => ({ ...prev, remote: e.target.checked }))}
                    className="rounded"
                  />
                  <Label htmlFor="remote">Remote jobs only</Label>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    setFilters({
                      jobType: "",
                      experienceLevel: "",
                      datePosted: "",
                      salaryRange: "",
                      remote: false,
                    })
                  }
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Search Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total Jobs Found:</span>
                    <span className="font-semibold">{totalJobs.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saved Jobs:</span>
                    <span className="font-semibold">{savedJobs.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Current Page:</span>
                    <span className="font-semibold">{currentPage}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Job Results */}
          <div className="lg:col-span-3">
            {jobs.length > 0 && (
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  {totalJobs.toLocaleString()} jobs found
                  {searchQuery && ` for "${searchQuery}"`}
                  {location && ` in ${location}`}
                </h2>
                <div className="flex items-center space-x-2">
                  <Label>Sort by:</Label>
                  <Select defaultValue="relevance">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Relevance</SelectItem>
                      <SelectItem value="date">Date Posted</SelectItem>
                      <SelectItem value="salary">Salary</SelectItem>
                      <SelectItem value="company">Company</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {loading && jobs.length === 0 ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-3 bg-gray-200 rounded w-full"></div>
                        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : jobs.length > 0 ? (
              <div className="space-y-4">
                {jobs.map((job) => (
                  <Card key={job.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-start space-x-4">
                            {job.logo ? (
                              <img
                                src={job.logo || "/placeholder.svg"}
                                alt={job.company}
                                className="w-12 h-12 rounded-lg object-cover"
                              />
                            ) : (
                              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                                <Building2 className="w-6 h-6 text-gray-400" />
                              </div>
                            )}
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-gray-900 hover:text-yellow-600 cursor-pointer">
                                {job.title}
                              </h3>
                              <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                                <span className="flex items-center">
                                  <Building2 className="w-4 h-4 mr-1" />
                                  {job.company}
                                </span>
                                <span className="flex items-center">
                                  <MapPin className="w-4 h-4 mr-1" />
                                  {job.location}
                                </span>
                                <span className="flex items-center">
                                  <Clock className="w-4 h-4 mr-1" />
                                  {job.posted}
                                </span>
                              </div>

                              <div className="flex items-center space-x-2 mt-2">
                                <Badge variant="secondary">{job.type}</Badge>
                                {job.remote && <Badge className="bg-green-100 text-green-800">Remote</Badge>}
                                {job.experience_level && <Badge variant="outline">{job.experience_level}</Badge>}
                                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                                  {job.source}
                                </Badge>
                              </div>

                              {job.salary && (
                                <div className="flex items-center mt-2 text-sm text-gray-600">
                                  <DollarSign className="w-4 h-4 mr-1" />
                                  {job.salary}
                                </div>
                              )}

                              <p className="text-gray-700 mt-3 line-clamp-3">{job.description}</p>

                              {job.requirements && job.requirements.length > 0 && (
                                <div className="mt-3">
                                  <p className="text-sm font-medium text-gray-900 mb-1">Requirements:</p>
                                  <div className="flex flex-wrap gap-1">
                                    {job.requirements.slice(0, 5).map((req, index) => (
                                      <Badge key={index} variant="outline" className="text-xs">
                                        {req}
                                      </Badge>
                                    ))}
                                    {job.requirements.length > 5 && (
                                      <Badge variant="outline" className="text-xs">
                                        +{job.requirements.length - 5} more
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col space-y-2 ml-4">
                          <Button
                            onClick={() => toggleSaveJob(job.id)}
                            variant="outline"
                            size="sm"
                            className={savedJobs.includes(job.id) ? "text-red-600 border-red-200" : ""}
                          >
                            <Heart className={`w-4 h-4 ${savedJobs.includes(job.id) ? "fill-current" : ""}`} />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-4">
                          <Button
                            onClick={() => applyToJob(job)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white"
                          >
                            Quick Apply
                          </Button>
                          <Button variant="outline" asChild>
                            <a href={job.url} target="_blank" rel="noopener noreferrer">
                              View on {job.source}
                              <ExternalLink className="w-4 h-4 ml-1" />
                            </a>
                          </Button>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Users className="w-4 h-4" />
                          <span>Easy Apply</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {jobs.length < totalJobs && (
                  <div className="text-center py-8">
                    <Button onClick={loadMore} disabled={loading} variant="outline" className="px-8">
                      {loading ? "Loading..." : "Load More Jobs"}
                    </Button>
                  </div>
                )}
              </div>
            ) : searchQuery ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your search criteria or removing some filters.</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("")
                      setLocation("")
                      setFilters({
                        jobType: "",
                        experienceLevel: "",
                        datePosted: "",
                        salaryRange: "",
                        remote: false,
                      })
                    }}
                  >
                    Clear Search
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Start your job search</h3>
                  <p className="text-gray-600">
                    Enter a job title, keywords, or company name to find thousands of opportunities.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
