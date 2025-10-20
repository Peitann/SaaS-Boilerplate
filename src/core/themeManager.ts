// Simple theme manager: store current theme name and allow resolving theme-aware paths
export type ThemeName = string;

let currentTheme: ThemeName = 'default';

export function setTheme(theme: ThemeName) {
  currentTheme = theme;
}

export function getTheme(): ThemeName {
  return currentTheme;
}

/**
 * Resolve a file path for the active theme. If the themed path doesn't exist,
 * the caller should fallback to the default path. This helper only returns
 * a string path — checking disk is the responsibility of the caller.
 */
export function themedPath(basePath: string, theme = currentTheme) {
  // Example: basePath = '/components/header', themed => '/themes/<theme>/components/header'
  return `/themes/${theme}${basePath.startsWith('/') ? '' : '/'}${basePath}`;
}

export default { setTheme, getTheme, themedPath };
