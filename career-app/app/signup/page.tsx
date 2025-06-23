import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Sparkles, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-yellow-300 to-white flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Benefits */}
        <div className="text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start space-x-2 mb-6">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-3xl font-bold text-gray-900">JobGenie</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Start Your AI-Powered Job Search Today</h1>

          <p className="text-xl text-gray-700 mb-8">
            Join 50,000+ job seekers who are landing their dream jobs faster with JobGenie's automation.
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex items-center">
              <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
              <span className="text-gray-700">Apply to hundreds of jobs automatically</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
              <span className="text-gray-700">AI-generated personalized cover letters</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
              <span className="text-gray-700">Save 15+ hours per week</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
              <span className="text-gray-700">3x higher interview callback rate</span>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-yellow-200">
            <p className="text-sm text-gray-600 mb-2">🎉 Limited Time Offer</p>
            <p className="font-semibold text-gray-900">Get your first month free when you sign up today!</p>
          </div>
        </div>

        {/* Right Side - Sign Up Form */}
        <Card className="w-full max-w-md mx-auto shadow-2xl border-yellow-200">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Create Your Account</CardTitle>
            <CardDescription>Start your 7-day free trial. No credit card required.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="john@example.com" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Create a strong password" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobTitle">Current/Desired Job Title</Label>
              <Input id="jobTitle" placeholder="e.g., Software Engineer" />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{" "}
                <Link href="/terms" className="text-yellow-600 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-yellow-600 hover:underline">
                  Privacy Policy
                </Link>
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="marketing" />
              <Label htmlFor="marketing" className="text-sm text-gray-600">
                Send me job search tips and product updates
              </Label>
            </div>

            <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 text-lg font-semibold">
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-yellow-600 hover:underline font-semibold">
                  Sign in
                </Link>
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-xs text-gray-500">
                🔒 Your data is secure and encrypted. We never share your information.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
