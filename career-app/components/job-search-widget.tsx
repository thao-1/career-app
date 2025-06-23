"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin } from "lucide-react"
import { useRouter } from "next/navigation"

export function JobSearchWidget() {
  const [query, setQuery] = useState("")
  const [location, setLocation] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    const params = new URLSearchParams()
    if (query) params.set("query", query)
    if (location) params.set("location", location)

    router.push(`/jobs?${params.toString()}`)
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">Find Your Dream Job</h3>
        <p className="text-gray-600">Search thousands of jobs from top companies</p>
      </div>
      <form onSubmit={handleSearch}>
        <div className="flex flex-col md:flex-row gap-4 p-4 bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Job title, keywords, or company"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Location or Remote"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
          </div>
          <Button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-white h-12 px-8 text-lg font-semibold"
          >
            Search Jobs
          </Button>
        </div>
      </form>
    </div>
  )
}
