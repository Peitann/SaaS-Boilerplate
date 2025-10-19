'use client';

import Layout from '@/components/layout/Layout';

export default function LayoutTestPage() {
  return (
    <Layout
      title="Layout Test - SaaS Boilerplate"
      regions={{
        'sidebar-left': (
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Categories
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-purple-400 text-sm"
                  >
                    Electronics
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-purple-400 text-sm"
                  >
                    Clothing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-purple-400 text-sm"
                  >
                    Home & Garden
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-purple-400 text-sm"
                  >
                    Sports
                  </a>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 dark:bg-purple-900/20 rounded-lg border border-blue-200 dark:border-purple-800 p-4">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-purple-200 mb-2">
                💡 Special Offer
              </h3>
              <p className="text-sm text-blue-700 dark:text-purple-300 mb-3">
                Get 20% off your first order!
              </p>
              <button className="w-full px-4 py-2 bg-blue-600 dark:bg-purple-600 hover:bg-blue-700 dark:hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors">
                Claim Now
              </button>
            </div>
          </div>
        ),
        'sidebar-right': (
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Recent Views
              </h3>
              <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                      <span className="text-gray-500 dark:text-gray-400 text-xs">
                        IMG
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Product {item}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        $99.99
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 p-4">
              <h3 className="text-sm font-semibold text-green-900 dark:text-green-200 mb-2">
                ✓ Free Shipping
              </h3>
              <p className="text-xs text-green-700 dark:text-green-300">
                On orders over $50
              </p>
            </div>
          </div>
        ),
      }}
    >
      <div className="space-y-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Layout & Theme System Test
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            This page demonstrates the complete layout system with dynamic partials and region management.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg">
              <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-3">
                🎨 Dynamic Themes
              </h2>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                The navbar and footer automatically switch based on the active theme. 
                Notice how the "default" theme uses blue accents, while "dark" uses purple!
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-lg">
              <h2 className="text-xl font-semibold text-purple-900 dark:text-purple-100 mb-3">
                📦 Region System
              </h2>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                Content is injected dynamically into regions: sidebar-left, sidebar-right, 
                top, bottom, before-content, and after-content.
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-lg">
              <h2 className="text-xl font-semibold text-green-900 dark:text-green-100 mb-3">
                ⚡ Live Updates
              </h2>
              <p className="text-sm text-green-700 dark:text-green-300">
                Click the theme toggle in the navbar. Watch how the entire layout, 
                including partials, updates instantly!
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 rounded-lg">
              <h2 className="text-xl font-semibold text-orange-900 dark:text-orange-100 mb-3">
                🔧 TypeScript Safe
              </h2>
              <p className="text-sm text-orange-700 dark:text-orange-300">
                All components are fully typed with TypeScript for better developer experience 
                and catch errors at compile time.
              </p>
            </div>
          </div>
        </div>

        {/* Sample Product Grid */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((product) => (
              <div
                key={product}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                <div className="w-full h-48 bg-gray-200 dark:bg-gray-600 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-gray-400 dark:text-gray-500 text-2xl">
                    Product {product}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Amazing Product {product}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Description of this wonderful product that you'll love.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-blue-600 dark:text-purple-400">
                    ${99.99 * product}
                  </span>
                  <button className="px-4 py-2 bg-blue-600 dark:bg-purple-600 hover:bg-blue-700 dark:hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testing Instructions */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800 p-6">
          <h2 className="text-xl font-bold text-yellow-900 dark:text-yellow-200 mb-4">
            🧪 Testing Checklist
          </h2>
          <ul className="space-y-2 text-sm text-yellow-800 dark:text-yellow-300">
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Click the theme toggle button (moon/sun icon) in the navbar</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Notice how Navbar and Footer completely change (different colors, branding)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Check the theme badges in navbar/footer showing active theme</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Sidebars (left & right) are injected via the region system</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Refresh the page - theme persists via localStorage</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Responsive layout: sidebars stack on mobile</span>
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
