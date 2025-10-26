'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';

import Layout from '@/components/layout/Layout';
import { formatCurrency } from '@/utils/format';

export default function LayoutTestPage() {
  const locale = useLocale();
  const withLocale = (path: string) => `/${locale}${path}`;
  return (
    <Layout
      title="Layout Test - SaaS Boilerplate"
      regions={{
        'sidebar-left': (
          <div className="space-y-4">
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                Categories
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href={withLocale('/products?category=electronics')}
                    className="text-sm text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-purple-400"
                  >
                    Electronics
                  </Link>
                </li>
                <li>
                  <Link
                    href={withLocale('/products?category=clothing')}
                    className="text-sm text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-purple-400"
                  >
                    Clothing
                  </Link>
                </li>
                <li>
                  <Link
                    href={withLocale('/products?category=home-garden')}
                    className="text-sm text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-purple-400"
                  >
                    Home & Garden
                  </Link>
                </li>
                <li>
                  <Link
                    href={withLocale('/products?category=sports')}
                    className="text-sm text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-purple-400"
                  >
                    Sports
                  </Link>
                </li>
              </ul>
            </div>

            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-purple-800 dark:bg-purple-900/20">
              <h3 className="mb-2 text-lg font-semibold text-blue-900 dark:text-purple-200">
                💡 Special Offer
              </h3>
              <p className="mb-3 text-sm text-blue-700 dark:text-purple-300">
                Get 20% off your first order!
              </p>
              <button type="button" className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 dark:bg-purple-600 dark:hover:bg-purple-700">
                Claim Now
              </button>
            </div>
          </div>
        ),
        'sidebar-right': (
          <div className="space-y-4">
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                Recent Views
              </h3>
              <div className="space-y-3">
                {[1, 2, 3].map(item => (
                  <div key={item} className="flex items-center space-x-3">
                    <div className="flex size-12 items-center justify-center rounded bg-gray-200 dark:bg-gray-700">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        IMG
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Product
                        {' '}
                        {item}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        $99.99
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
              <h3 className="mb-2 text-sm font-semibold text-green-900 dark:text-green-200">
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
        <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            Layout & Theme System Test
          </h1>
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            This page demonstrates the complete layout system with dynamic partials and region management.
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 p-6 dark:from-blue-900/30 dark:to-blue-800/30">
              <h2 className="mb-3 text-xl font-semibold text-blue-900 dark:text-blue-100">
                🎨 Dynamic Themes
              </h2>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                The navbar and footer automatically switch based on the active theme.
                Notice how the "default" theme uses blue accents, while "dark" uses purple!
              </p>
            </div>

            <div className="rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 p-6 dark:from-purple-900/30 dark:to-purple-800/30">
              <h2 className="mb-3 text-xl font-semibold text-purple-900 dark:text-purple-100">
                📦 Region System
              </h2>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                Content is injected dynamically into regions: sidebar-left, sidebar-right,
                top, bottom, before-content, and after-content.
              </p>
            </div>

            <div className="rounded-lg bg-gradient-to-br from-green-50 to-green-100 p-6 dark:from-green-900/30 dark:to-green-800/30">
              <h2 className="mb-3 text-xl font-semibold text-green-900 dark:text-green-100">
                ⚡ Live Updates
              </h2>
              <p className="text-sm text-green-700 dark:text-green-300">
                Click the theme toggle in the navbar. Watch how the entire layout,
                including partials, updates instantly!
              </p>
            </div>

            <div className="rounded-lg bg-gradient-to-br from-orange-50 to-orange-100 p-6 dark:from-orange-900/30 dark:to-orange-800/30">
              <h2 className="mb-3 text-xl font-semibold text-orange-900 dark:text-orange-100">
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
        <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[1, 2, 3].map(product => (
              <div
                key={product}
                className="flex h-full flex-col overflow-hidden rounded-lg bg-gray-50 p-4 transition-shadow hover:shadow-lg dark:bg-gray-700"
              >
                <div className="mb-4 flex h-48 w-full items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-600">
                  <span className="text-2xl text-gray-400 dark:text-gray-500">
                    Product
                    {' '}
                    {product}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                    Amazing Product
                    {' '}
                    {product}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Description of this wonderful product that you'll love.
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <span className="flex-1 whitespace-nowrap pr-2 text-xl font-bold text-blue-600 dark:text-purple-400">
                    {formatCurrency(99.99 * product)}
                  </span>
                  <button type="button" className="w-auto min-w-0 max-w-[45%] shrink whitespace-normal break-words rounded-lg bg-blue-600 p-2 text-center text-xs font-medium leading-tight text-white transition-colors hover:bg-blue-700 dark:bg-purple-600 dark:hover:bg-purple-700 sm:px-3 sm:text-sm">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testing Instructions */}
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-6 dark:border-yellow-800 dark:bg-yellow-900/20">
          <h2 className="mb-4 text-xl font-bold text-yellow-900 dark:text-yellow-200">
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
