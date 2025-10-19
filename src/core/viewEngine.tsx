import type { ComponentType, ReactElement, ReactNode } from 'react';

/**
 * View Engine Abstraction
 * Provides a simple API for rendering React components
 * Similar to traditional template engines but for React
 */

// Type definitions
export interface ViewEngineOptions {
  cache?: boolean;
  useLayout?: boolean;
}

export interface RenderOptions {
  props?: Record<string, any>;
  layout?: ComponentType<{ children: ReactNode }>;
}

export interface ViewData {
  [key: string]: any;
}

/**
 * Core ViewEngine class
 */
export class ViewEngine {
  private viewCache: Map<string, ComponentType<any>> = new Map();
  private options: ViewEngineOptions;

  constructor(options: ViewEngineOptions = {}) {
    this.options = {
      cache: options.cache ?? true,
      useLayout: options.useLayout ?? false,
    };
  }

  /**
   * Render a React component with optional data
   * @param Component - React component to render
   * @param data - Props/data to pass to the component
   * @returns ReactElement
   */
  render<T extends Record<string, any>>(
    Component: ComponentType<T>,
    data?: T,
  ): ReactElement {
    return <Component {...(data as T)} />;
  }

  /**
   * Render a component wrapped in a layout
   * @param Component - Main content component
   * @param Layout - Layout wrapper component
   * @param data - Props for the main component
   * @returns ReactElement
   */
  renderWithLayout<T extends Record<string, any>>(
    Component: ComponentType<T>,
    Layout: ComponentType<{ children: ReactNode }>,
    data?: T,
  ): ReactElement {
    return (
      <Layout>
        <Component {...(data as T)} />
      </Layout>
    );
  }

  /**
   * Compose multiple components together
   * @param components - Array of component configurations
   * @returns ReactElement with composed components
   */
  compose(
    components: Array<{
      Component: ComponentType<any>;
      props?: Record<string, any>;
    }>,
  ): ReactElement {
    return (
      <>
        {components.map(({ Component, props }, index) => (
          <Component key={index} {...props} />
        ))}
      </>
    );
  }

  /**
   * Cache a component for reuse
   * @param key - Unique identifier for the component
   * @param Component - Component to cache
   */
  cacheView(key: string, Component: ComponentType<any>): void {
    if (this.options.cache) {
      this.viewCache.set(key, Component);
    }
  }

  /**
   * Retrieve a cached component
   * @param key - Component identifier
   * @returns Cached component or undefined
   */
  getCachedView(key: string): ComponentType<any> | undefined {
    return this.viewCache.get(key);
  }

  /**
   * Clear all cached views
   */
  clearCache(): void {
    this.viewCache.clear();
  }

  /**
   * Clear a specific cached view
   * @param key - Component identifier
   */
  clearView(key: string): void {
    this.viewCache.delete(key);
  }

  /**
   * Check if a view is cached
   * @param key - Component identifier
   */
  isCached(key: string): boolean {
    return this.viewCache.has(key);
  }

  /**
   * Get all cached view keys
   */
  getCachedKeys(): string[] {
    return Array.from(this.viewCache.keys());
  }
}

/**
 * Helper function to create a view engine instance
 */
export function createViewEngine(
  options?: ViewEngineOptions,
): ViewEngine {
  return new ViewEngine(options);
}

/**
 * Default view engine instance (singleton)
 */
export const viewEngine = new ViewEngine({ cache: true });

/**
 * Utility: Render component with data
 */
export function renderView<T extends Record<string, any>>(
  Component: ComponentType<T>,
  data?: T,
): ReactElement {
  return viewEngine.render(Component, data);
}

/**
 * Utility: Render component with layout
 */
export function renderWithLayout<T extends Record<string, any>>(
  Component: ComponentType<T>,
  Layout: ComponentType<{ children: ReactNode }>,
  data?: T,
): ReactElement {
  return viewEngine.renderWithLayout(Component, Layout, data);
}

/**
 * Utility: Compose multiple views
 */
export function composeViews(
  components: Array<{
    Component: ComponentType<any>;
    props?: Record<string, any>;
  }>,
): ReactElement {
  return viewEngine.compose(components);
}
