'use client';

import { useThemeSafe } from '@/core/theme/ThemeContext';

export default function Navbar() {
  const { toggleTheme, theme } = useThemeSafe();

  return (
    <nav className="bg-gray-900 border-b border-gray-800 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-xl font-bold text-white">
              SaaS Store Dark
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-gray-300 hover:text-purple-400 font-medium transition-colors"
            >
              Products
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-purple-400 font-medium transition-colors"
            >
              Categories
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-purple-400 font-medium transition-colors"
            >
              About
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-purple-400 font-medium transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
              title={`Switch to ${theme === 'default' ? 'dark' : 'default'} theme`}
            >
              {theme === 'default' ? (
                // Moon icon for dark mode
                <svg
                  className="w-5 h-5 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              ) : (
                // Sun icon for light mode
                <svg
                  className="w-5 h-5 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              )}
            </button>

            {/* Cart Button */}
            <button className="p-2 rounded-lg hover:bg-gray-800 transition-colors relative">
              <svg
                className="w-5 h-5 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button>

            {/* Sign In Button */}
            <button className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
              Sign In
            </button>
          </div>
        </div>
      </div>

      {/* Theme Badge */}
      <div className="bg-purple-900/30 border-b border-purple-800/50 py-1">
        <div className="container mx-auto px-4">
          <p className="text-xs text-purple-300 text-center">
            Theme: <span className="font-semibold">Dark</span>
          </p>
        </div>
      </div>
    </nav>
  );
}
