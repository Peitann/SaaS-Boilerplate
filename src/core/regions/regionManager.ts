import type { ReactNode } from 'react';

/**
 * Region Manager for dynamic content injection
 * Allows registering and rendering widgets/components in specific regions
 */

interface Widget {
  id: string;
  component: ReactNode;
  order?: number;
}

interface RegionMap {
  [regionName: string]: Widget[];
}

class RegionManager {
  private regions: RegionMap = {};

  /**
   * Register a widget/component in a specific region
   * @param regionName - The name of the region (e.g., 'sidebar', 'header', 'footer')
   * @param widget - Widget configuration with id, component, and optional order
   */
  registerRegion(regionName: string, widget: Widget): void {
    if (!this.regions[regionName]) {
      this.regions[regionName] = [];
    }

    // Check if widget with same ID already exists
    const existingIndex = this.regions[regionName].findIndex(
      (w) => w.id === widget.id,
    );

    if (existingIndex !== -1) {
      // Replace existing widget
      this.regions[regionName][existingIndex] = widget;
    } else {
      // Add new widget
      this.regions[regionName].push(widget);
    }

    // Sort by order if specified
    this.regions[regionName].sort((a, b) => {
      const orderA = a.order ?? 999;
      const orderB = b.order ?? 999;
      return orderA - orderB;
    });
  }

  /**
   * Register multiple widgets at once
   */
  registerMultiple(regionName: string, widgets: Widget[]): void {
    widgets.forEach((widget) => this.registerRegion(regionName, widget));
  }

  /**
   * Get all widgets for a specific region
   * @param regionName - The name of the region
   * @returns Array of widgets (components) for that region
   */
  getRegion(regionName: string): Widget[] {
    return this.regions[regionName] || [];
  }

  /**
   * Unregister a specific widget from a region
   */
  unregisterWidget(regionName: string, widgetId: string): void {
    if (this.regions[regionName]) {
      this.regions[regionName] = this.regions[regionName].filter(
        (w) => w.id !== widgetId,
      );
    }
  }

  /**
   * Clear all widgets from a region
   */
  clearRegion(regionName: string): void {
    this.regions[regionName] = [];
  }

  /**
   * Clear all regions
   */
  clearAll(): void {
    this.regions = {};
  }

  /**
   * Check if a region has any widgets
   */
  hasWidgets(regionName: string): boolean {
    return (this.regions[regionName]?.length ?? 0) > 0;
  }

  /**
   * Get all region names
   */
  getAllRegionNames(): string[] {
    return Object.keys(this.regions);
  }
}

// Export singleton instance
export const regionManager = new RegionManager();

// Export class for testing or custom instances
export { RegionManager };
export type { Widget };
