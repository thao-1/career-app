import { SiteLayout } from '@/components/site-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Zap, Target, BarChart3, Code2, Clock, Shield, Settings, FileText } from 'lucide-react';

export default function FeaturesPage() {
  const features = [
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: "Lightning Fast Applications",
      description: "Apply to multiple jobs in seconds with our one-click application system."
    },
    {
      icon: <Target className="w-8 h-8 text-blue-500" />,
      title: "Smart Job Matching",
      description: "Our AI matches your skills and preferences with the perfect job opportunities."
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-green-500" />,
      title: "Application Analytics",
      description: "Track your job applications and get insights to improve your success rate."
    },
    {
      icon: <FileText className="w-8 h-8 text-purple-500" />,
      title: "Resume Builder",
      description: "Create a professional resume that stands out to employers."
    },
    {
      icon: <Clock className="w-8 h-8 text-orange-500" />,
      title: "Time-Saving Tools",
      description: "Automate repetitive tasks and focus on what matters most."
    },
    {
      icon: <Shield className="w-8 h-8 text-red-500" />,
      title: "Privacy First",
      description: "Your data belongs to you. We never sell your information to third parties."
    },
  ];

  return (
    <SiteLayout>
      <div className="bg-gradient-to-br from-yellow-400 via-yellow-300 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Everything you need to streamline your job search and land your dream job faster.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-opacity-10 rounded-lg" style={{ backgroundColor: `${feature.icon.props.className.includes('text-yellow') ? 'rgba(234, 179, 8, 0.1)' : feature.icon.props.className.includes('text-blue') ? 'rgba(59, 130, 246, 0.1)' : feature.icon.props.className.includes('text-green') ? 'rgba(34, 197, 94, 0.1)' : feature.icon.props.className.includes('text-purple') ? 'rgba(168, 85, 247, 0.1)' : feature.icon.props.className.includes('text-orange') ? 'rgba(249, 115, 22, 0.1)' : 'rgba(239, 68, 68, 0.1)'}` }}>
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
