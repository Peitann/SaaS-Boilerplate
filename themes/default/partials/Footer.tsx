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
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="text-gray-900">
              <Logo />
            </div>
            <p className="text-sm text-gray-600">
              Your trusted e-commerce platform for quality products and exceptional service.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900">
              Shop
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href={productsPath} className="text-sm text-gray-600 transition-colors hover:text-blue-600">
                  All Products
                </Link>
              </li>
              <li>
                <Link href={newArrivalsPath} className="text-sm text-gray-600 transition-colors hover:text-blue-600">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href={bestSellersPath} className="text-sm text-gray-600 transition-colors hover:text-blue-600">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link href={salePath} className="text-sm text-gray-600 transition-colors hover:text-blue-600">
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href={helpCenterPath} className="text-sm text-gray-600 transition-colors hover:text-blue-600">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href={shippingPath} className="text-sm text-gray-600 transition-colors hover:text-blue-600">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href={returnsPath} className="text-sm text-gray-600 transition-colors hover:text-blue-600">
                  Returns
                </Link>
              </li>
              <li>
                <Link href={contactPath} className="text-sm text-gray-600 transition-colors hover:text-blue-600">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900">
              Newsletter
            </h3>
            <p className="mb-4 text-sm text-gray-600">
              Subscribe for exclusive offers and updates.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 rounded-l-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button type="button" className="rounded-r-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-gray-200 pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-sm text-gray-600">
              ©
              {' '}
              {currentYear}
              {' '}
              SaaS Store. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href={privacyPath} className="text-sm text-gray-600 transition-colors hover:text-blue-600">
                Privacy Policy
              </Link>
              <Link href={termsPath} className="text-sm text-gray-600 transition-colors hover:text-blue-600">
                Terms of Service
              </Link>
              <Link href={cookiePath} className="text-sm text-gray-600 transition-colors hover:text-blue-600">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}
