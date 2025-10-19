import type { ComponentType } from 'react';

/**
 * View Resolver Utility
 * Handles dynamic component loading and resolution
 */

export interface ViewResolverConfig {
  basePath?: string;
  defaultExtension?: string;
  cache?: boolean;
}

export class ViewResolver {
  private config: Required<ViewResolverConfig>;
  private loadedViews: Map<string, ComponentType<any>> = new Map();

  constructor(config: ViewResolverConfig = {}) {
    this.config = {
      basePath: config.basePath || '',
      defaultExtension: config.defaultExtension || '.tsx',
      cache: config.cache ?? true,
    };
  }

  /**
   * Dynamically import a view/component
   * @param path - Path to the component (relative to basePath)
   * @returns Promise<ComponentType>
   */
  async resolve(path: string): Promise<ComponentType<any>> {
    // Check cache first
    if (this.config.cache && this.loadedViews.has(path)) {
      return this.loadedViews.get(path)!;
    }

    try {
      // Construct full path
      const fullPath = this.constructPath(path);

      // Dynamic import
      const module = await import(/* @vite-ignore */ fullPath);

      // Get default export
      const Component = module.default;

      if (!Component) {
        throw new Error(`No default export found in ${fullPath}`);
      }

      // Cache the component
      if (this.config.cache) {
        this.loadedViews.set(path, Component);
      }

      return Component;
    } catch (error) {
      console.error(`Failed to resolve view: ${path}`, error);
      throw error;
    }
  }

  /**
   * Resolve multiple views at once
   * @param paths - Array of view paths
   * @returns Promise<Array<ComponentType>>
   */
  async resolveMultiple(paths: string[]): Promise<ComponentType<any>[]> {
    return Promise.all(paths.map(path => this.resolve(path)));
  }

  /**
   * Construct full path from relative path
   * @param path - Relative path
   * @returns Full path
   */
  private constructPath(path: string): string {
    // Remove leading slash if present
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;

    // Add extension if not present
    const pathWithExtension = cleanPath.endsWith(this.config.defaultExtension)
      ? cleanPath
      : `${cleanPath}${this.config.defaultExtension}`;

    // Combine with base path
    return this.config.basePath
      ? `${this.config.basePath}/${pathWithExtension}`
      : pathWithExtension;
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this.loadedViews.clear();
  }

  /**
   * Clear specific view from cache
   */
  clearView(path: string): void {
    this.loadedViews.delete(path);
  }

  /**
   * Check if view is cached
   */
  isCached(path: string): boolean {
    return this.loadedViews.has(path);
  }

  /**
   * Get all cached view paths
   */
  getCachedPaths(): string[] {
    return Array.from(this.loadedViews.keys());
  }
}

/**
 * Create a view resolver instance
 */
export function createViewResolver(
  config?: ViewResolverConfig,
): ViewResolver {
  return new ViewResolver(config);
}

/**
 * Default view resolver instance
 */
export const viewResolver = new ViewResolver({
  basePath: '@/components',
  cache: true,
});

/**
 * Utility: Resolve a single view
 */
export async function resolveView(path: string): Promise<ComponentType<any>> {
  return viewResolver.resolve(path);
}

/**
 * Utility: Resolve multiple views
 */
export async function resolveViews(
  paths: string[],
): Promise<ComponentType<any>[]> {
  return viewResolver.resolveMultiple(paths);
}
