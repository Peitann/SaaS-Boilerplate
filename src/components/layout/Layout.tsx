'use client';

import { useThemeSafe } from '@/core/theme/ThemeContext';
import { regionManager } from '@/core/regions/regionManager';
import { type ReactNode, useEffect, useState } from 'react';
import type React from 'react';

interface LayoutProps {
  title?: string;
  children: ReactNode;
  regions?: {
    [regionName: string]: ReactNode;
  };
}

export default function Layout({ title, children, regions = {} }: LayoutProps) {
  const { theme } = useThemeSafe();
  const [mounted, setMounted] = useState(false);
  const [Navbar, setNavbar] = useState<React.ComponentType | null>(null);
  const [Footer, setFooter] = useState<React.ComponentType | null>(null);

  // Set mounted state (client-side only)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Dynamically load Navbar and Footer based on active theme (client-side only)
  useEffect(() => {
    if (!mounted) return;

    const loadPartials = async () => {
      try {
        const navbarModule = await import(
          `../../../themes/${theme}/partials/Navbar`
        );
        const footerModule = await import(
          `../../../themes/${theme}/partials/Footer`
        );

        setNavbar(() => navbarModule.default);
        setFooter(() => footerModule.default);
      } catch (error) {
        console.error(`Failed to load partials for theme: ${theme}`, error);
      }
    };

    loadPartials();
  }, [theme, mounted]);

  // Register regions if provided
  useEffect(() => {
    // Clear all regions before registering new ones
    regionManager.clearAll();

    // Register each region
    Object.entries(regions).forEach(([regionName, content]) => {
      regionManager.registerRegion(regionName, {
        id: `${regionName}-main`,
        component: content,
        order: 1,
      });
    });
  }, [regions]);

  // Render region helper
  const renderRegion = (regionName: string) => {
    const widgets = regionManager.getRegion(regionName);
    
    if (widgets.length === 0) {
      return null;
    }

    return (
      <div className="region-container" data-region={regionName}>
        {widgets.map((widget) => (
          <div key={widget.id} className="region-widget">
            {widget.component}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="layout-wrapper min-h-screen flex flex-col">
      {/* Document Title */}
      {title && (
        <head>
          <title>{title}</title>
        </head>
      )}

      {/* Navbar */}
      <header className="layout-header">
        {!mounted ? (
          <div className="h-16 bg-gray-100 dark:bg-gray-800 animate-pulse" />
        ) : Navbar ? (
          <Navbar />
        ) : (
          <div className="h-16 bg-gray-100 dark:bg-gray-800 animate-pulse" />
        )}
      </header>

      {/* Main Content with Regions */}
      <main className="layout-main flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Top Region */}
          {renderRegion('top')}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar Left */}
            {regionManager.hasWidgets('sidebar-left') && (
              <aside className="lg:col-span-3">
                <div className="sticky top-4">
                  {renderRegion('sidebar-left')}
                </div>
              </aside>
            )}

            {/* Main Content */}
            <div
              className={
                regionManager.hasWidgets('sidebar-left') ||
                regionManager.hasWidgets('sidebar-right')
                  ? 'lg:col-span-6'
                  : 'lg:col-span-12'
              }
            >
              {/* Before Content Region */}
              {renderRegion('before-content')}

              {/* Page Content */}
              <div className="page-content">{children}</div>

              {/* After Content Region */}
              {renderRegion('after-content')}
            </div>

            {/* Sidebar Right */}
            {regionManager.hasWidgets('sidebar-right') && (
              <aside className="lg:col-span-3">
                <div className="sticky top-4">
                  {renderRegion('sidebar-right')}
                </div>
              </aside>
            )}
          </div>

          {/* Bottom Region */}
          {renderRegion('bottom')}
        </div>
      </main>

      {/* Footer */}
      <footer className="layout-footer mt-auto">
        {!mounted ? (
          <div className="h-20 bg-gray-100 dark:bg-gray-800 animate-pulse" />
        ) : Footer ? (
          <Footer />
        ) : (
          <div className="h-20 bg-gray-100 dark:bg-gray-800 animate-pulse" />
        )}
      </footer>
    </div>
  );
}
