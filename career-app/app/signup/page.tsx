import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Sparkles, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { signIn } from "next-auth/react"

export default function SignUpPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    jobTitle: "",
    terms: false,
    marketing: false,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    if (!form.terms) {
      setError("You must agree to the Terms of Service and Privacy Policy.")
      return
    }
    setLoading(true)
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          password: form.password,
          jobTitle: form.jobTitle,
        }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setSuccess("Account created! Redirecting to dashboard...")
        setTimeout(() => {
          window.location.href = "/dashboard"
        }, 1500)
      } else {
        setError(data.error || "Signup failed. Please try again.")
      }
    } catch {
      setError("Signup failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

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
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" value={form.firstName} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" value={form.lastName} onChange={handleChange} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="john@example.com" value={form.email} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Create a strong password" value={form.password} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobTitle">Current/Desired Job Title</Label>
                <Input id="jobTitle" placeholder="e.g., Software Engineer" value={form.jobTitle} onChange={handleChange} />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="terms" checked={form.terms} onCheckedChange={(checked) => setForm((prev) => ({ ...prev, terms: !!checked }))} />
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
                <Checkbox id="marketing" checked={form.marketing} onCheckedChange={(checked) => setForm((prev) => ({ ...prev, marketing: !!checked }))} />
                <Label htmlFor="marketing" className="text-sm text-gray-600">
                  Send me job search tips and product updates
                </Label>
              </div>

              {error && <div className="text-red-600 text-sm text-center">{error}</div>}
              {success && <div className="text-green-600 text-sm text-center">{success}</div>}

              <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 text-lg font-semibold" disabled={loading}>
                {loading ? "Signing up..." : <>Start Free Trial <ArrowRight className="ml-2 w-5 h-5" /></>}
              </Button>
            </form>

            <Button
              type="button"
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Sign up with Google
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
