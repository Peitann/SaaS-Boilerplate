'use client';

import { useThemeSafe } from '@/core/theme/ThemeContext';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeSafe();

  return (
    <button
      onClick={toggleTheme}
      className="rounded-lg p-2 transition-colors hover:bg-muted"
      aria-label="Toggle theme"
      title={`Switch to ${theme === 'default' ? 'dark' : 'light'} theme`}
    >
      {theme === 'default' ? (
        // Moon icon for switching to dark mode
        <svg
          className="size-5 stroke-current"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : (
        // Sun icon for switching to light mode
        <svg
          className="size-5 stroke-current"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <circle cx={12} cy={12} r={4} />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      )}
    </button>
  );
};
