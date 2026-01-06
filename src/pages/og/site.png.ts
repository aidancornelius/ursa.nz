import type { APIRoute } from 'astro';
import { getEntry } from 'astro:content';
import { renderOgImage } from '../../lib/og';

export const GET: APIRoute = async () => {
  const siteConfig = await getEntry('site', 'config');
  const siteTitle = siteConfig?.data.title ?? 'ursa';
  const siteDescription = siteConfig?.data.description ?? 'the universe as reflected by sarah and aidan';

  return renderOgImage({
    title: siteDescription,
    subtitle: siteTitle,
  });
};
