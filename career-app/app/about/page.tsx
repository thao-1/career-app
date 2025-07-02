import { SiteLayout } from '@/components/site-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target, Lightbulb, Heart } from 'lucide-react';

export default function AboutPage() {
  const team = [
    {
      name: "Alex Johnson",
      role: "CEO & Founder",
      bio: "Former tech recruiter with a passion for making hiring more efficient."
    },
    {
      name: "Sam Lee",
      role: "CTO",
      bio: "Full-stack developer with 10+ years of experience in building scalable applications."
    },
    {
      name: "Jordan Smith",
      role: "Lead Designer",
      bio: "UI/UX expert focused on creating intuitive and beautiful user experiences."
    },
    {
      name: "Taylor Chen",
      role: "Growth Marketer",
      bio: "Data-driven marketer helping job seekers find the right opportunities."
    }
  ];

  const stats = [
    { value: "10,000+", label: "Active Users" },
    { value: "50,000+", label: "Jobs Posted" },
    { value: "85%", label: "Success Rate" },
    { value: "24/7", label: "Support" }
  ];

  return (
    <SiteLayout>
      <div className="bg-gradient-to-br from-yellow-400 via-yellow-300 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">About CareerHack</h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Empowering job seekers with the tools they need to succeed in today's competitive market.
            </p>
          </div>

          <div className="mb-20">
            <h2 className="text-2xl font-semibold text-center mb-8">Our Story</h2>
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
              <p className="text-gray-700 mb-4">
                CareerHack was founded in 2023 with a simple mission: to make job searching less stressful and more efficient. 
                We noticed that the job application process was often tedious, repetitive, and time-consuming for both job seekers and employers.
              </p>
              <p className="text-gray-700">
                Our platform combines powerful automation with intelligent matching to help you find the right opportunities 
                and submit applications in a fraction of the time it would normally take.
              </p>
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-2xl font-semibold text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-yellow-600" />
                </div>
                <CardTitle className="mb-2">Mission-Driven</CardTitle>
                <CardContent className="p-0 text-gray-600">
                  We're committed to making job searching more efficient and less stressful for everyone.
                </CardContent>
              </Card>
              
              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="w-8 h-8 text-yellow-600" />
                </div>
                <CardTitle className="mb-2">Innovation</CardTitle>
                <CardContent className="p-0 text-gray-600">
                  We continuously improve our platform with the latest technology to serve you better.
                </CardContent>
              </Card>
              
              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-yellow-600" />
                </div>
                <CardTitle className="mb-2">User-First</CardTitle>
                <CardContent className="p-0 text-gray-600">
                  Your success is our success. We build with your needs at the forefront.
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-2xl font-semibold text-center mb-12">Our Team</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                  <div className="w-24 h-24 bg-yellow-100 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-yellow-600">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <CardHeader className="p-0 mb-2">
                    <CardTitle>{member.name}</CardTitle>
                    <p className="text-yellow-600">{member.role}</p>
                  </CardHeader>
                  <CardContent className="p-0 text-gray-600">
                    {member.bio}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-center mb-6">Join Our Mission</h2>
            <p className="text-gray-700 text-center mb-8">
              We're always looking for talented individuals to join our team and help us revolutionize the job search process.
            </p>
            <div className="text-center">
              <a 
                href="/careers" 
                className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                View Open Positions
              </a>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
