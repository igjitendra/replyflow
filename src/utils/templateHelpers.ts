import { getCollection, type CollectionEntry } from 'astro:content';

export type Template = CollectionEntry<'templates'>;

export interface FilterOptions {
  industry?: string;
  channel?: string;
  tone?: string;
  language?: string;
  objective?: string;
  searchQuery?: string;
}

/**
 * Fetch all templates from content collections
 */
export async function getAllTemplates(): Promise<Template[]> {
  return await getCollection('templates', ({ data }) => !data.draft);
}

/**
 * Filter templates by industry, channel, tone, language, objective, or search query
 */
export async function getFilteredTemplates(options: FilterOptions = {}): Promise<Template[]> {
  const templates = await getAllTemplates();

  return templates.filter((template) => {
    const { data } = template;

    if (options.industry && data.industry !== options.industry) {
      return false;
    }
    if (options.channel && data.channel !== options.channel) {
      return false;
    }
    if (options.tone && data.tone !== options.tone) {
      return false;
    }
    if (options.language && data.language !== options.language) {
      return false;
    }
    if (options.objective && data.objective !== options.objective) {
      return false;
    }
    if (options.searchQuery && options.searchQuery.trim() !== '') {
      const q = options.searchQuery.toLowerCase();
      const matchTitle = data.title.toLowerCase().includes(q);
      const matchBody = template.body.toLowerCase().includes(q);
      const matchTags = data.tags.some((tag) => tag.toLowerCase().includes(q));
      if (!matchTitle && !matchBody && !matchTags) {
        return false;
      }
    }
    return true;
  });
}

/**
 * Get single template by ID or slug
 */
export async function getTemplateById(id: string): Promise<Template | undefined> {
  const templates = await getAllTemplates();
  return templates.find((t) => t.data.id === id || t.slug === id);
}

/**
 * Get templates grouped by Industry
 */
export async function getTemplatesByIndustry(industrySlug: string): Promise<Template[]> {
  return getFilteredTemplates({ industry: industrySlug });
}
