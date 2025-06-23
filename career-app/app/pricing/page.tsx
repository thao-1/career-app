"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Star, Sparkles, Gift, Zap } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <Badge className="mb-6 bg-green-100 text-green-800 border-green-300">
            🎉 Limited Time - Completely Free!
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            JobGenie is{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">
              100% Free
            </span>{" "}
            Right Now!
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            We're in beta and want to help as many job seekers as possible. Get unlimited access to all premium features
            at no cost while we perfect the platform.
          </p>
        </div>
      </div>

      {/* Free Plan Card */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="relative border-yellow-400 shadow-2xl bg-gradient-to-br from-yellow-50 to-white">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            <Badge className="bg-yellow-500 text-white px-6 py-2 text-lg font-semibold">
              <Gift className="w-5 h-5 mr-2" />
              Everything Free During Beta
            </Badge>
          </div>

          <CardHeader className="text-center pt-12 pb-8">
            <div className="w-20 h-20 mx-auto rounded-full bg-yellow-100 flex items-center justify-center mb-6">
              <Sparkles className="w-10 h-10 text-yellow-600" />
            </div>
            <CardTitle className="text-4xl font-bold mb-4">Free Beta Access</CardTitle>
            <div className="mb-6">
              <span className="text-6xl font-bold text-gray-900">$0</span>
              <span className="text-2xl text-gray-600">/forever*</span>
            </div>
            <CardDescription className="text-lg">
              Full access to all premium features while we're in beta. No credit card required, no hidden fees.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">🤖 AI-Powered Features</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Unlimited AI cover letter generation</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Resume optimization with AI</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Smart job matching algorithm</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Personalized application insights</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">⚡ Automation Features</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Unlimited job applications</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Auto-apply to LinkedIn, Indeed & more</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Application tracking & analytics</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Interview scheduling integration</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">🚀 Why Free During Beta?</h3>
              <p className="text-gray-700">
                We're perfecting JobGenie with real user feedback. Help us build the best AI job search platform and
                enjoy premium features for free!
              </p>
            </div>

            <div className="text-center space-y-4">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-12 py-4 text-xl font-semibold"
                >
                  <Zap className="w-6 h-6 mr-2" />
                  Get Free Access Now
                </Button>
              </Link>
              <p className="text-sm text-gray-600">
                * Free during beta period. We'll notify you well in advance before any pricing changes.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Value Proposition */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">What You Get For Free</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-5xl font-bold text-yellow-600 mb-4">∞</div>
              <div className="text-xl font-semibold text-gray-900 mb-2">Unlimited Applications</div>
              <div className="text-gray-600">Apply to as many jobs as you want with no restrictions</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-yellow-600 mb-4">3x</div>
              <div className="text-xl font-semibold text-gray-900 mb-2">Higher Success Rate</div>
              <div className="text-gray-600">AI-optimized applications get 3x more responses</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-yellow-600 mb-4">15+</div>
              <div className="text-xl font-semibold text-gray-900 mb-2">Hours Saved Weekly</div>
              <div className="text-gray-600">Automate the tedious parts of job searching</div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Beta Users Love JobGenie</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-yellow-200">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-white font-bold">
                    SC
                  </div>
                  <div className="ml-4">
                    <div className="font-semibold">Sarah Chen</div>
                    <div className="text-sm text-gray-600">Beta User → Google Engineer</div>
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
                  "Getting JobGenie for free during beta was amazing! The AI cover letters helped me land my dream job
                  at Google. Can't believe this is free!"
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
                    <div className="text-sm text-gray-600">Beta User → Meta Analyst</div>
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
                  "Applied to 200+ jobs effortlessly with JobGenie's automation. Got 5 offers! The fact that it's free
                  makes it even better."
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
                    <div className="text-sm text-gray-600">Beta User → Amazon PM</div>
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
                  "JobGenie saved me 15+ hours per week. I focused on interview prep instead of applications. Free
                  access during beta was a game-changer!"
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-20 bg-gradient-to-r from-yellow-400 to-orange-400">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Transform Your Job Search?</h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of beta users who are landing their dream jobs with JobGenie - completely free!
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-white text-yellow-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
              <Gift className="w-5 h-5 mr-2" />
              Get Free Beta Access
            </Button>
          </Link>
          <p className="text-white/80 mt-6">No credit card required • Unlimited access • Join the beta today</p>
        </div>
      </div>
    </div>
  )
}
