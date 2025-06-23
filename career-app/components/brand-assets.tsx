import { CareerHackLogo } from "./logo"

export function BrandShowcase() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">CareerHack Brand Assets</h1>

        {/* Logo Variations */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Logo Variations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Full Logo */}
            <div className="bg-white p-8 rounded-lg shadow-sm border">
              <h3 className="text-lg font-medium mb-4">Full Logo</h3>
              <div className="flex flex-col space-y-4">
                <CareerHackLogo size="xl" variant="full" />
                <CareerHackLogo size="lg" variant="full" />
                <CareerHackLogo size="md" variant="full" />
                <CareerHackLogo size="sm" variant="full" />
              </div>
            </div>

            {/* Icon Only */}
            <div className="bg-white p-8 rounded-lg shadow-sm border">
              <h3 className="text-lg font-medium mb-4">Icon Only</h3>
              <div className="flex flex-col space-y-4">
                <CareerHackLogo size="xl" variant="icon" />
                <CareerHackLogo size="lg" variant="icon" />
                <CareerHackLogo size="md" variant="icon" />
                <CareerHackLogo size="sm" variant="icon" />
              </div>
            </div>

            {/* Text Only */}
            <div className="bg-white p-8 rounded-lg shadow-sm border">
              <h3 className="text-lg font-medium mb-4">Text Only</h3>
              <div className="flex flex-col space-y-4">
                <CareerHackLogo size="xl" variant="text" />
                <CareerHackLogo size="lg" variant="text" />
                <CareerHackLogo size="md" variant="text" />
                <CareerHackLogo size="sm" variant="text" />
              </div>
            </div>

            {/* Dark Background */}
            <div className="bg-gray-900 p-8 rounded-lg shadow-sm border">
              <h3 className="text-lg font-medium mb-4 text-white">On Dark Background</h3>
              <div className="flex flex-col space-y-4">
                <CareerHackLogo size="xl" variant="full" />
                <CareerHackLogo size="lg" variant="icon" />
              </div>
            </div>
          </div>
        </section>

        {/* Color Palette */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-400 rounded-lg mx-auto mb-2 shadow-sm"></div>
              <p className="text-sm font-medium">Primary Yellow</p>
              <p className="text-xs text-gray-600">#FFD700</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-500 rounded-lg mx-auto mb-2 shadow-sm"></div>
              <p className="text-sm font-medium">Secondary Orange</p>
              <p className="text-xs text-gray-600">#FFA500</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-red-500 rounded-lg mx-auto mb-2 shadow-sm"></div>
              <p className="text-sm font-medium">Accent Red</p>
              <p className="text-xs text-gray-600">#FF6900</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-900 rounded-lg mx-auto mb-2 shadow-sm"></div>
              <p className="text-sm font-medium">Dark Gray</p>
              <p className="text-xs text-gray-600">#1F2937</p>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Typography</h2>
          <div className="bg-white p-8 rounded-lg shadow-sm border">
            <div className="space-y-4">
              <div>
                <h1 className="text-4xl font-bold text-gray-900">CareerHack</h1>
                <p className="text-sm text-gray-600">Primary Heading - Inter Bold</p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">Hack Your Way to Success</h2>
                <p className="text-sm text-gray-600">Secondary Heading - Inter Semibold</p>
              </div>
              <div>
                <p className="text-base text-gray-700">Automate your job applications with AI-powered precision.</p>
                <p className="text-sm text-gray-600">Body Text - Inter Regular</p>
              </div>
            </div>
          </div>
        </section>

        {/* Usage Guidelines */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Usage Guidelines</h2>
          <div className="bg-white p-8 rounded-lg shadow-sm border">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-green-600 mb-2">✅ Do:</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Use the full logo when space allows</li>
                  <li>• Maintain minimum clear space around the logo</li>
                  <li>• Use high contrast backgrounds</li>
                  <li>• Keep the gradient colors intact</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-red-600 mb-2">❌ Don't:</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Stretch or distort the logo</li>
                  <li>• Change the colors or gradient</li>
                  <li>• Use on low contrast backgrounds</li>
                  <li>• Add effects or shadows to the logo</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
