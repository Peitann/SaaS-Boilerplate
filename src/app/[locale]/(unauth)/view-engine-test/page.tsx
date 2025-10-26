'use client';

import { useState } from 'react';

import { composeViews, renderView, renderWithLayout, viewEngine } from '@/core/viewEngine';

// Sample Components untuk demo
const WelcomeComponent = ({ name, message }: { name: string; message?: string }) => (
  <div className="rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 p-6 dark:from-blue-900/30 dark:to-blue-800/30">
    <h2 className="mb-2 text-2xl font-bold text-blue-900 dark:text-blue-100">
      Welcome,
      {' '}
      {name}
      !
    </h2>
    {message && (
      <p className="text-blue-700 dark:text-blue-300">{message}</p>
    )}
  </div>
);

const StatsComponent = ({ views, users, revenue }: { views: number; users: number; revenue: string }) => (
  <div className="rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 p-6 dark:from-purple-900/30 dark:to-purple-800/30">
    <h3 className="mb-4 text-lg font-semibold text-purple-900 dark:text-purple-100">
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
  <div className="rounded-lg border-2 border-dashed border-gray-300 bg-white p-6 dark:border-gray-600 dark:bg-gray-800">
    <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
      Layout Wrapper
    </div>
    {children}
  </div>
);

const InfoBox = ({ title, content }: { title: string; content: string }) => (
  <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
    <h4 className="mb-2 font-semibold text-green-900 dark:text-green-100">{title}</h4>
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
    <div className="min-h-screen bg-gray-50 py-8 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="mb-2 text-4xl font-bold text-gray-900 dark:text-white">
              View Engine Test
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Demonstrating the View Engine abstraction capabilities
            </p>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Example 1: Simple Render */}
            <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                1. Simple Component Render
              </h2>
              <p className="mb-4 text-gray-600 dark:text-gray-400">
                Using
                {' '}
                <code className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-700">renderView()</code>
              </p>
              <div className="space-y-4">
                {renderView(WelcomeComponent, {
                  name: 'John Doe',
                  message: 'This component was rendered using the View Engine!',
                })}
              </div>
            </section>

            {/* Example 2: Render with Layout */}
            <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                2. Component with Layout Wrapper
              </h2>
              <p className="mb-4 text-gray-600 dark:text-gray-400">
                Using
                {' '}
                <code className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-700">renderWithLayout()</code>
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
            <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                3. Compose Multiple Components
              </h2>
              <p className="mb-4 text-gray-600 dark:text-gray-400">
                Using
                {' '}
                <code className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-700">composeViews()</code>
              </p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
            <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                4. View Caching
              </h2>
              <p className="mb-4 text-gray-600 dark:text-gray-400">
                Cache components for reuse and better performance
              </p>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleCacheComponent}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                  >
                    Cache Components
                  </button>
                  <button
                    type="button"
                    onClick={handleClearCache}
                    className="rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
                  >
                    Clear Cache
                  </button>
                </div>

                <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                  <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Cached Views (
                    {cacheInfo.length}
                    ):
                  </p>
                  {cacheInfo.length > 0
                    ? (
                        <ul className="list-inside list-disc space-y-1">
                          {cacheInfo.map(key => (
                            <li key={key} className="text-sm text-gray-600 dark:text-gray-400">
                              {key}
                            </li>
                          ))}
                        </ul>
                      )
                    : (
                        <p className="text-sm italic text-gray-500 dark:text-gray-500">
                          No views cached yet
                        </p>
                      )}
                </div>
              </div>
            </section>

            {/* Technical Details */}
            <section className="rounded-lg border border-yellow-200 bg-yellow-50 p-6 dark:border-yellow-800 dark:bg-yellow-900/20">
              <h2 className="mb-4 text-xl font-bold text-yellow-900 dark:text-yellow-200">
                💡 How It Works
              </h2>
              <div className="space-y-3 text-sm text-yellow-800 dark:text-yellow-300">
                <div>
                  <strong>ViewEngine Class:</strong>
                  {' '}
                  Core abstraction for rendering React components
                </div>
                <div>
                  <strong>render():</strong>
                  {' '}
                  Render a component with props/data
                </div>
                <div>
                  <strong>renderWithLayout():</strong>
                  {' '}
                  Wrap component in a layout
                </div>
                <div>
                  <strong>compose():</strong>
                  {' '}
                  Combine multiple components
                </div>
                <div>
                  <strong>Caching:</strong>
                  {' '}
                  Store components in memory for reuse
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
