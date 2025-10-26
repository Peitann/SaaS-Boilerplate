'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';

import { Logo } from '@/templates/Logo';
import { getI18nPath } from '@/utils/Helpers';

export default function Footer() {
  const locale = useLocale();
  const productsPath = getI18nPath('/products', locale);
  const newArrivalsPath = getI18nPath('/products/new', locale);
  const bestSellersPath = getI18nPath('/products/best-sellers', locale);
  const salePath = getI18nPath('/sale', locale);
  const helpCenterPath = getI18nPath('/help', locale);
  const shippingPath = getI18nPath('/shipping', locale);
  const returnsPath = getI18nPath('/returns', locale);
  const contactPath = getI18nPath('/contact', locale);
  const privacyPath = getI18nPath('/privacy', locale);
  const termsPath = getI18nPath('/terms', locale);
  const cookiePath = getI18nPath('/cookies', locale);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-800 bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="text-white">
              <Logo />
            </div>
            <p className="text-sm text-gray-400">
              Your trusted e-commerce platform for quality products and exceptional service.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Shop
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href={productsPath} className="text-sm text-gray-400 transition-colors hover:text-purple-400">
                  All Products
                </Link>
              </li>
              <li>
                <Link href={newArrivalsPath} className="text-sm text-gray-400 transition-colors hover:text-purple-400">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href={bestSellersPath} className="text-sm text-gray-400 transition-colors hover:text-purple-400">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link href={salePath} className="text-sm text-gray-400 transition-colors hover:text-purple-400">
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href={helpCenterPath} className="text-sm text-gray-400 transition-colors hover:text-purple-400">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href={shippingPath} className="text-sm text-gray-400 transition-colors hover:text-purple-400">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href={returnsPath} className="text-sm text-gray-400 transition-colors hover:text-purple-400">
                  Returns
                </Link>
              </li>
              <li>
                <Link href={contactPath} className="text-sm text-gray-400 transition-colors hover:text-purple-400">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Newsletter
            </h3>
            <p className="mb-4 text-sm text-gray-400">
              Subscribe for exclusive offers and updates.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 rounded-l-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button type="button" className="rounded-r-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-700">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-sm text-gray-400">
              ©
              {' '}
              {currentYear}
              {' '}
              SaaS Store. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href={privacyPath} className="text-sm text-gray-400 transition-colors hover:text-purple-400">
                Privacy Policy
              </Link>
              <Link href={termsPath} className="text-sm text-gray-400 transition-colors hover:text-purple-400">
                Terms of Service
              </Link>
              <Link href={cookiePath} className="text-sm text-gray-400 transition-colors hover:text-purple-400">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}
