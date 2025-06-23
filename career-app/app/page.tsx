import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Zap, Target, BarChart3, Code2, CheckCircle, Star } from "lucide-react"
import Link from "next/link"
import { JobSearchWidget } from "@/components/job-search-widget"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-yellow-300 to-white">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-sm border-b border-yellow-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">CareerHack</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/features" className="text-gray-700 hover:text-yellow-600 transition-colors">
                Features
              </Link>
              <Link href="/pricing" className="text-gray-700 hover:text-yellow-600 transition-colors">
                Pricing
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-yellow-600 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-yellow-600 transition-colors">
                Contact
              </Link>
              <Link href="/jobs" className="text-gray-700 hover:text-yellow-600 transition-colors">
                Find Jobs
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost" className="text-gray-700 hover:text-yellow-600">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-yellow-100 text-yellow-800 border-yellow-300">
            ✨ Your AI-Powered Job Application Assistant
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Hack Your Way to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">
              Your Dream Job
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
            CareerHack automates your job applications with AI-powered precision. Apply to hundreds of jobs
            effortlessly, generate killer cover letters, and hack the job market like a pro.
          </p>
          <div className="mb-12">
            <JobSearchWidget />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/signup">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/jobs">
              <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 px-8 py-4 text-lg">
                Browse All Jobs
              </Button>
            </Link>
          </div>
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              7-day free trial
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              No credit card required
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              Cancel anytime
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-yellow-600 mb-2">50K+</div>
              <div className="text-gray-600">Active Job Seekers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-600 mb-2">1M+</div>
              <div className="text-gray-600">Applications Sent</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-600 mb-2">3x</div>
              <div className="text-gray-600">Higher Interview Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-600 mb-2">15+</div>
              <div className="text-gray-600">Hours Saved Weekly</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Powerful Features That Get You Hired</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform handles every aspect of your job search, from finding opportunities to submitting
              applications automatically.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-yellow-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-yellow-600" />
                </div>
                <CardTitle>AI Cover Letters</CardTitle>
                <CardDescription>
                  Generate personalized cover letters that match job requirements perfectly
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-yellow-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-yellow-600" />
                </div>
                <CardTitle>Auto Applications</CardTitle>
                <CardDescription>
                  Automatically apply to hundreds of jobs across LinkedIn, Indeed, and more
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-yellow-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-yellow-600" />
                </div>
                <CardTitle>Smart Analytics</CardTitle>
                <CardDescription>
                  Track your application success rate and optimize your job search strategy
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600">See how CareerHack helped thousands land their dream jobs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-yellow-200">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-white font-bold">
                    SC
                  </div>
                  <div className="ml-4">
                    <div className="font-semibold">Sarah Chen</div>
                    <div className="text-sm text-gray-600">Software Engineer at Google</div>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  "CareerHack helped me land my dream job at Google in just 3 weeks. The AI cover letters were so
                  personalized, I got callbacks from 80% of my applications!"
                </p>
              </CardContent>
            </Card>

            <Card className="border-yellow-200">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-white font-bold">
                    MR
                  </div>
                  <div className="ml-4">
                    <div className="font-semibold">Marcus Rodriguez</div>
                    <div className="text-sm text-gray-600">Marketing Analyst at Meta</div>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  "As a recent graduate, I was struggling to get interviews. CareerHack's automation let me apply to
                  200+ jobs effortlessly. I got 5 job offers!"
                </p>
              </CardContent>
            </Card>

            <Card className="border-yellow-200">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-white font-bold">
                    JP
                  </div>
                  <div className="ml-4">
                    <div className="font-semibold">Jennifer Park</div>
                    <div className="text-sm text-gray-600">Product Manager at Amazon</div>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  "The time I saved with CareerHack was incredible. Instead of spending hours on applications, I focused
                  on interview prep. Landed a $120k salary increase!"
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-yellow-400 to-orange-400">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Transform Your Job Search?</h2>
          <p className="text-xl text-white/90 mb-8">
            Join 50,000+ job seekers who are already using AI to land their dream jobs faster.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-white text-yellow-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
              Start Your Free Trial Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <p className="text-white/80 mt-4">No credit card required • 7-day free trial • Cancel anytime</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold">CareerHack</span>
              </div>
              <p className="text-gray-400">
                Your AI-powered job application assistant that helps you land your dream job faster.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/features" className="hover:text-yellow-400 transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-yellow-400 transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/api" className="hover:text-yellow-400 transition-colors">
                    API
                  </Link>
                </li>
                <li>
                  <Link href="/integrations" className="hover:text-yellow-400 transition-colors">
                    Integrations
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-yellow-400 transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-yellow-400 transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/status" className="hover:text-yellow-400 transition-colors">
                    Status
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="hover:text-yellow-400 transition-colors">
                    Community
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-yellow-400 transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-yellow-400 transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-yellow-400 transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-yellow-400 transition-colors">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CareerHack. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

