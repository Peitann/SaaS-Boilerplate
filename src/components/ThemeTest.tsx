'use client';

import { useTheme } from '@/core/theme/ThemeContext';

export default function ThemeTest() {
  const { theme, setTheme, toggleTheme } = useTheme();

  return (
    <div className="p-8 space-y-4">
      <div className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Theme Test Component
        </h2>
        
        <div className="space-y-4">
          {/* Current Theme Display */}
          <div className="p-4 rounded bg-gray-100 dark:bg-gray-700">
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
              onClick={toggleTheme}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
            >
              Toggle Theme
            </button>

            <button
              onClick={() => setTheme('default')}
              className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={theme === 'default'}
            >
              Set Default
            </button>

            <button
              onClick={() => setTheme('dark')}
              className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={theme === 'dark'}
            >
              Set Dark
            </button>
          </div>

          {/* Visual Feedback */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                Light Mode Colors
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-200 mt-2">
                This text changes color based on theme
              </p>
            </div>

            <div className="p-4 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800">
              <h3 className="font-semibold text-purple-900 dark:text-purple-100">
                Dark Mode Colors
              </h3>
              <p className="text-sm text-purple-700 dark:text-purple-200 mt-2">
                Notice how everything adapts!
              </p>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-6 p-4 rounded-lg border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>💡 Testing Tips:</strong>
            </p>
            <ul className="list-disc list-inside text-sm text-yellow-700 dark:text-yellow-300 mt-2 space-y-1">
              <li>Click "Toggle Theme" to switch between themes</li>
              <li>Check localStorage in DevTools (key: "app-theme")</li>
              <li>Inspect the <code className="px-1 bg-yellow-200 dark:bg-yellow-800 rounded">data-theme</code> attribute on <code className="px-1 bg-yellow-200 dark:bg-yellow-800 rounded">&lt;html&gt;</code></li>
              <li>Refresh the page - theme should persist!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
