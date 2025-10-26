'use client';

import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { useLocale } from 'next-intl';

import { ThemeToggle } from '@/components/ThemeToggle';
import { Logo } from '@/templates/Logo';
import { getI18nPath } from '@/utils/Helpers';

export default function Navbar() {
  const locale = useLocale();
  const dashboardPath = getI18nPath('/dashboard', locale);
  const productsPath = getI18nPath('/products', locale);
  const categoriesPath = getI18nPath('/categories', locale);
  const aboutPath = getI18nPath('/about', locale);
  const contactPath = getI18nPath('/contact', locale);

  return (
    <nav className="border-b border-gray-200 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Brand (no logo) */}
          <div className="flex items-center">
            <Link href={dashboardPath} className="flex items-center text-gray-900">
              <Logo />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden items-center space-x-8 md:flex">
            <Link href={productsPath} className="font-medium text-gray-700 transition-colors hover:text-blue-600">
              Products
            </Link>
            <Link href={categoriesPath} className="font-medium text-gray-700 transition-colors hover:text-blue-600">
              Categories
            </Link>
            <Link href={aboutPath} className="font-medium text-gray-700 transition-colors hover:text-blue-600">
              About
            </Link>
            <Link href={contactPath} className="font-medium text-gray-700 transition-colors hover:text-blue-600">
              Contact
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <ThemeToggle />
            {/* duplicate manual toggle removed; using ThemeToggle component above */}

            {/* Cart removed for cleaner demo */}

            {/* Auth Buttons */}
            <SignedOut>
              <div className="flex items-center gap-2">
                <SignUpButton mode="modal">
                  <button type="button" className="rounded-lg border border-blue-600 px-3 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50">
                    Sign Up
                  </button>
                </SignUpButton>
                <SignInButton mode="modal">
                  <button type="button" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
                    Sign In
                  </button>
                </SignInButton>
              </div>
            </SignedOut>
            <SignedIn>
              <Link href={dashboardPath} className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600">
                Dashboard
              </Link>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
}
