'use client';

import { useState } from 'react';
import { composeViews, renderView, renderWithLayout, viewEngine } from '@/core/viewEngine';

// Sample Components untuk demo
const WelcomeComponent = ({ name, message }: { name: string; message?: string }) => (
  <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg">
    <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-2">
      Welcome, {name}!
    </h2>
    {message && (
      <p className="text-blue-700 dark:text-blue-300">{message}</p>
    )}
  </div>
);

const StatsComponent = ({ views, users, revenue }: { views: number; users: number; revenue: string }) => (
  <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-lg">
    <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-4">
      Dashboard Stats
    </h3>
    <div className="grid grid-cols-3 gap-4">
      <div>
        <p className="text-sm text-purple-600 dark:text-purple-400">Views</p>
        <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">{views.toLocaleString()}</p>
      </div>
      <div>
        <p className="text-sm text-purple-600 dark:text-purple-400">Users</p>
        <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">{users.toLocaleString()}</p>
      </div>
      <div>
        <p className="text-sm text-purple-600 dark:text-purple-400">Revenue</p>
        <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">{revenue}</p>
      </div>
    </div>
  </div>
);

const CardLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 bg-white dark:bg-gray-800">
    <div className="mb-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
      Layout Wrapper
    </div>
    {children}
  </div>
);

const InfoBox = ({ title, content }: { title: string; content: string }) => (
  <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
    <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">{title}</h4>
    <p className="text-sm text-green-700 dark:text-green-300">{content}</p>
  </div>
);

export default function ViewEngineTestPage() {
  const [cacheInfo, setCacheInfo] = useState<string[]>([]);

  // Demo: Cache a component
  const handleCacheComponent = () => {
    viewEngine.cacheView('welcome', WelcomeComponent);
    viewEngine.cacheView('stats', StatsComponent);
    setCacheInfo(viewEngine.getCachedKeys());
  };

  // Demo: Clear cache
  const handleClearCache = () => {
    viewEngine.clearCache();
    setCacheInfo([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              View Engine Test
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Demonstrating the View Engine abstraction capabilities
            </p>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Example 1: Simple Render */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                1. Simple Component Render
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Using <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">renderView()</code>
              </p>
              <div className="space-y-4">
                {renderView(WelcomeComponent, {
                  name: 'John Doe',
                  message: 'This component was rendered using the View Engine!',
                })}
              </div>
            </section>

            {/* Example 2: Render with Layout */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                2. Component with Layout Wrapper
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Using <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">renderWithLayout()</code>
              </p>
              <div className="space-y-4">
                {renderWithLayout(
                  StatsComponent,
                  CardLayout,
                  { views: 125340, users: 8432, revenue: '$45,230' },
                )}
              </div>
            </section>

            {/* Example 3: Compose Multiple Components */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                3. Compose Multiple Components
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Using <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">composeViews()</code>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {composeViews([
                  {
                    Component: InfoBox,
                    props: {
                      title: 'First Component',
                      content: 'This is the first component in the composition.',
                    },
                  },
                  {
                    Component: InfoBox,
                    props: {
                      title: 'Second Component',
                      content: 'This is the second component in the composition.',
                    },
                  },
                  {
                    Component: InfoBox,
                    props: {
                      title: 'Third Component',
                      content: 'Multiple components rendered together seamlessly!',
                    },
                  },
                  {
                    Component: InfoBox,
                    props: {
                      title: 'Fourth Component',
                      content: 'The view engine handles composition elegantly.',
                    },
                  },
                ])}
              </div>
            </section>

            {/* Example 4: Cache Management */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                4. View Caching
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Cache components for reuse and better performance
              </p>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <button
                    onClick={handleCacheComponent}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Cache Components
                  </button>
                  <button
                    onClick={handleClearCache}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  >
                    Clear Cache
                  </button>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Cached Views ({cacheInfo.length}):
                  </p>
                  {cacheInfo.length > 0 ? (
                    <ul className="list-disc list-inside space-y-1">
                      {cacheInfo.map(key => (
                        <li key={key} className="text-sm text-gray-600 dark:text-gray-400">
                          {key}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-500 italic">
                      No views cached yet
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* Technical Details */}
            <section className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
              <h2 className="text-xl font-bold text-yellow-900 dark:text-yellow-200 mb-4">
                💡 How It Works
              </h2>
              <div className="space-y-3 text-sm text-yellow-800 dark:text-yellow-300">
                <div>
                  <strong>ViewEngine Class:</strong> Core abstraction for rendering React components
                </div>
                <div>
                  <strong>render():</strong> Render a component with props/data
                </div>
                <div>
                  <strong>renderWithLayout():</strong> Wrap component in a layout
                </div>
                <div>
                  <strong>compose():</strong> Combine multiple components
                </div>
                <div>
                  <strong>Caching:</strong> Store components in memory for reuse
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
