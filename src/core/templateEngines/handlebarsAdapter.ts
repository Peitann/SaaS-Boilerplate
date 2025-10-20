import Handlebars from 'handlebars';

import type { TemplateEngine } from '@/core/templateEngine';

const adapter: TemplateEngine = {
  renderString: (template: string, data = {}) => {
    try {
      const compiled = Handlebars.compile(template);
      return compiled(data as any);
    } catch (err) {
      // bubble up as string for simplicity
      return `TEMPLATE_RENDER_ERROR: ${String(err)}`;
    }
  },
};

export default adapter;
