import { registerTemplateEngine, renderString } from './templateEngine';
import handlebarsAdapter from './templateEngines/handlebarsAdapter';

// Daftarkan adapter (demo) — pastikan file ini hanya diimport saat Anda butuh demo/utility
registerTemplateEngine(handlebarsAdapter);

export function renderDemo(data: { name: string; count: number }) {
  const tpl = '<p>Hello {{name}}, count={{count}}</p>';
  return renderString(tpl, data);
}

export default renderDemo;
