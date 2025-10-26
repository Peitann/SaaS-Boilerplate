'use client';

import React, {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type Theme = 'default' | 'dark';

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const THEME_STORAGE_KEY = 'app-theme';

type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: Theme;
};

export function ThemeProvider({
  children,
  defaultTheme = 'default',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage on mount
  useEffect(() => {
    setMounted(true);

    // Check if we're in the browser
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
      if (storedTheme && (storedTheme === 'default' || storedTheme === 'dark')) {
        setThemeState(storedTheme);
      }
    }
  }, []);

  // Update localStorage and document attribute when theme changes
  useEffect(() => {
    if (!mounted) {
      return;
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
      document.documentElement.setAttribute('data-theme', theme);

      // Also add/remove dark class for Tailwind dark mode
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [theme, mounted]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState(prevTheme => (prevTheme === 'default' ? 'dark' : 'default'));
  };

  const value: ThemeContextValue = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme],
  );

  // Always provide context, even before mount, so children using useTheme don't crash
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}

// Optional: Hook to get theme without errors (returns default if outside provider)
export function useThemeSafe(): ThemeContextValue {
  const context = useContext(ThemeContext);

  return context || {
    theme: 'default',
    setTheme: () => {},
    toggleTheme: () => {},
  };
}
