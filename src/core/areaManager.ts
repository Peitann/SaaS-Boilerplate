// Minimal area/region manager for registering and rendering components into named areas
import type React from 'react';

export type AreaComponent = {
  id?: string;
  render: () => React.ReactNode;
};

const areas: Record<string, AreaComponent[]> = {};

export function registerToArea(area: string, component: AreaComponent) {
  if (!areas[area]) {
    areas[area] = [];
  }
  areas[area].push(component);
}

export function getAreaComponents(area: string) {
  return areas[area] ?? [];
}

export function clearAreas() {
  Object.keys(areas).forEach(k => (areas[k] = []));
}

export default {
  registerToArea,
  getAreaComponents,
  clearAreas,
};
