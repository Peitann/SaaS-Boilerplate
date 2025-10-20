// Template engine abstraction
// In this React/Next.js project we primarily use JSX. This module provides a
// small abstraction so server-side template engines (EJS/Handlebars/Pug)
// can be plugged in later if needed.

export type RenderResult = string;

export type TemplateEngine = {
  renderString: (template: string, data?: Record<string, any>) => string;
};

// Default engine: identity renderer (returns template as-is)
const defaultEngine: TemplateEngine = {
  renderString: (template: string) => template,
};

// gunakan default engine agar renderString aman dipanggil sebelum registrasi
let engine: TemplateEngine = defaultEngine;

export function registerTemplateEngine(e: TemplateEngine) {
  engine = e;
}

export function renderString(template: string, data?: Record<string, any>) {
  if (!engine) {
    throw new Error('No template engine registered');
  }
  return engine.renderString(template, data);
}
