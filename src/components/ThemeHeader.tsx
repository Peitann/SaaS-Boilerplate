'use client';

import React, { Suspense } from 'react';

import { AppConfig } from '@/utils/AppConfig';

// Dynamic import helper: tries to import from /src/themes/<theme>/Header
function loadThemeHeader(theme: string) {
  // Note: Next.js supports dynamic imports but dynamic path must be handled carefully.
  // We use a small switch for demo purposes.
  switch (theme) {
    case 'dark':
      return import('@/themes/dark/Header').then(m => m.default);
    case 'default':
    default:
      return import('@/themes/default/Header').then(m => m.default);
  }
}

export default function ThemeHeader() {
  const ThemeCompPromise = loadThemeHeader(AppConfig.theme ?? 'default');
  const Themed = React.lazy(() => ThemeCompPromise.then(comp => ({ default: comp })));

  return (
    <Suspense fallback={<div className="mb-4 p-4">Loading theme...</div>}>
      <Themed />
    </Suspense>
  );
}
