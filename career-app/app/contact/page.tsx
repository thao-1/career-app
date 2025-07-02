import { SiteLayout } from '@/components/site-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

export default function ContactPage() {
  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6 text-yellow-600" />,
      title: "Email Us",
      description: "We'll get back to you within 24 hours",
      value: "support@careerhack.com"
    },
    {
      icon: <Phone className="w-6 h-6 text-yellow-600" />,
      title: "Call Us",
      description: "Mon-Fri from 9am to 5pm",
      value: "+1 (555) 123-4567"
    },
    {
      icon: <MapPin className="w-6 h-6 text-yellow-600" />,
      title: "Visit Us",
      description: "Come say hello at our office",
      value: "123 Career St, San Francisco, CA 94107"
    }
  ];

  return (
    <SiteLayout>
      <div className="bg-gradient-to-br from-yellow-400 via-yellow-300 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Have questions? We're here to help. Send us a message and we'll get back to you as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="bg-white rounded-lg shadow-lg p-8 h-full">
                <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <Input id="first-name" type="text" placeholder="John" />
                    </div>
                    <div>
                      <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <Input id="last-name" type="text" placeholder="Doe" />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <Input id="email" type="email" placeholder="you@example.com" />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <Input id="subject" type="text" placeholder="How can we help?" />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <Textarea 
                      id="message" 
                      rows={5} 
                      placeholder="Your message here..."
                      className="resize-none"
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <Button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-white">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </div>
                </form>
              </div>
            </div>
            
            <div>
              <div className="space-y-8">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 bg-yellow-100 p-3 rounded-full">
                      {item.icon}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                      <p className="text-gray-900 font-medium mt-1">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-800">How quickly can I expect a response?</h4>
                    <p className="text-gray-600 text-sm">We typically respond to all inquiries within 24 hours during business days.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Do you offer phone support?</h4>
                    <p className="text-gray-600 text-sm">Yes, our support team is available by phone during business hours.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Where are you located?</h4>
                    <p className="text-gray-600 text-sm">Our headquarters are in San Francisco, but we serve customers worldwide.</p>
                  </div>
                </div>
                <div className="mt-6">
                  <Button variant="outline" className="w-full">
                    View All FAQs
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
