'use client';

import { useTheme } from '@/core/theme/ThemeContext';

export default function ThemeTest() {
  const { theme, setTheme, toggleTheme } = useTheme();

  return (
    <div className="space-y-4 p-8">
      <div className="rounded-lg border border-gray-300 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          Theme Test Component
        </h2>

        <div className="space-y-4">
          {/* Current Theme Display */}
          <div className="rounded bg-gray-100 p-4 dark:bg-gray-700">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Current Theme:
            </p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              {theme}
            </p>
          </div>

          {/* Theme Controls */}
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
            >
              Toggle Theme
            </button>

            <button
              type="button"
              onClick={() => setTheme('default')}
              className="rounded-lg bg-green-600 px-4 py-2 font-medium text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={theme === 'default'}
            >
              Set Default
            </button>

            <button
              type="button"
              onClick={() => setTheme('dark')}
              className="rounded-lg bg-purple-600 px-4 py-2 font-medium text-white transition-colors hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={theme === 'dark'}
            >
              Set Dark
            </button>
          </div>

          {/* Visual Feedback */}
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 p-4 dark:from-blue-900 dark:to-blue-800">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                Light Mode Colors
              </h3>
              <p className="mt-2 text-sm text-blue-700 dark:text-blue-200">
                This text changes color based on theme
              </p>
            </div>

            <div className="rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 p-4 dark:from-purple-900 dark:to-purple-800">
              <h3 className="font-semibold text-purple-900 dark:text-purple-100">
                Dark Mode Colors
              </h3>
              <p className="mt-2 text-sm text-purple-700 dark:text-purple-200">
                Notice how everything adapts!
              </p>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-6 rounded-lg border-l-4 border-yellow-500 bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>💡 Testing Tips:</strong>
            </p>
            <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-yellow-700 dark:text-yellow-300">
              <li>Click "Toggle Theme" to switch between themes</li>
              <li>Check localStorage in DevTools (key: "app-theme")</li>
              <li>
                Inspect the
                <code className="rounded bg-yellow-200 px-1 dark:bg-yellow-800">data-theme</code>
                {' '}
                attribute on
                <code className="rounded bg-yellow-200 px-1 dark:bg-yellow-800">&lt;html&gt;</code>
              </li>
              <li>Refresh the page - theme should persist!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
