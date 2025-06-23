import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Briefcase, FileText, Send, TrendingUp, Users, Calendar, Target, Clock, Search, LogOut } from "lucide-react"
import Link from "next/link"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/next-auth"
import { signOut } from "next-auth/react"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>You need to be signed in to view this page</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/login">
              <Button className="w-full">Sign In</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {session.user?.name || 'User'}!
              </h1>
              <p className="text-gray-600 mt-1">
                {session.user?.email}
              </p>
            </div>
            <div className="flex space-x-4">
              <Link href="/jobs">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
                  <Search className="w-4 h-4 mr-2" />
                  Find Jobs
                </Button>
              </Link>
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Upload Resume
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-yellow-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Applications Sent</CardTitle>
              <Send className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">127</div>
              <p className="text-xs text-gray-600">
                <span className="text-green-600">+12</span> from last week
              </p>
            </CardContent>
          </Card>

          <Card className="border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Interview Requests</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">23</div>
              <p className="text-xs text-gray-600">
                <span className="text-green-600">+5</span> from last week
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">18.1%</div>
              <p className="text-xs text-gray-600">
                <span className="text-green-600">+2.3%</span> from last week
              </p>
            </CardContent>
          </Card>

          <Card className="border-orange-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Saved Jobs</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">47</div>
              <p className="text-xs text-gray-600">Jobs bookmarked</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Applications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-yellow-600" />
                  Recent Applications
                </CardTitle>
                <CardDescription>Your latest job applications and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold">Senior Software Engineer</h3>
                      <p className="text-sm text-gray-600">Google • San Francisco, CA</p>
                      <p className="text-xs text-gray-500 mt-1">Applied 2 hours ago</p>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold">Product Manager</h3>
                      <p className="text-sm text-gray-600">Meta • Menlo Park, CA</p>
                      <p className="text-xs text-gray-500 mt-1">Applied 1 day ago</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">Interview Scheduled</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold">Full Stack Developer</h3>
                      <p className="text-sm text-gray-600">Netflix • Los Gatos, CA</p>
                      <p className="text-xs text-gray-500 mt-1">Applied 3 days ago</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Response Received</Badge>
                  </div>
                </div>
                <Link href="/applications">
                  <Button variant="outline" className="w-full mt-4">
                    View All Applications
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Application Analytics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-yellow-600" />
                  Application Analytics
                </CardTitle>
                <CardDescription>Track your job search performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="weekly" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="weekly">Weekly</TabsTrigger>
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                    <TabsTrigger value="yearly">Yearly</TabsTrigger>
                  </TabsList>
                  <TabsContent value="weekly" className="space-y-4">
                    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">Chart visualization would go here</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks to boost your job search</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/jobs">
                  <Button className="w-full justify-start bg-yellow-500 hover:bg-yellow-600 text-white">
                    <Target className="w-4 h-4 mr-2" />
                    Find New Jobs
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Cover Letter
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Update Profile
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
              </CardContent>
            </Card>

            {/* Job Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Recommended Jobs</CardTitle>
                <CardDescription>AI-curated opportunities for you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 border border-gray-200 rounded-lg">
                  <h4 className="font-semibold text-sm">Frontend Developer</h4>
                  <p className="text-xs text-gray-600">Airbnb • Remote</p>
                  <div className="flex items-center justify-between mt-2">
                    <Badge variant="secondary" className="text-xs">
                      95% Match
                    </Badge>
                    <Link href="/jobs">
                      <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-white">
                        View Job
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="p-3 border border-gray-200 rounded-lg">
                  <h4 className="font-semibold text-sm">React Developer</h4>
                  <p className="text-xs text-gray-600">Stripe • San Francisco</p>
                  <div className="flex items-center justify-between mt-2">
                    <Badge variant="secondary" className="text-xs">
                      92% Match
                    </Badge>
                    <Link href="/jobs">
                      <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-white">
                        View Job
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="p-3 border border-gray-200 rounded-lg">
                  <h4 className="font-semibold text-sm">Software Engineer</h4>
                  <p className="text-xs text-gray-600">Uber • New York</p>
                  <div className="flex items-center justify-between mt-2">
                    <Badge variant="secondary" className="text-xs">
                      89% Match
                    </Badge>
                    <Link href="/jobs">
                      <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-white">
                        View Job
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Goals */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Goals</CardTitle>
                <CardDescription>Stay on track with your job search</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Applications Sent</span>
                    <span>12/15</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Cover Letters Generated</span>
                    <span>8/10</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Jobs Saved</span>
                    <span>45/50</span>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
