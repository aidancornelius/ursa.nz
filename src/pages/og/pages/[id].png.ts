import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection, getEntry } from 'astro:content';
import { renderOgImage } from '../../../lib/og';

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await getCollection('pages');
  return pages.map((page) => ({
    params: { id: page.id.replace(/\.md$/, '') },
    props: {
      title: page.data.title,
    },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const siteConfig = await getEntry('site', 'config');
  const siteTitle = siteConfig?.data.title ?? 'ursa';

  return renderOgImage({
    title: props.title,
    subtitle: siteTitle,
  });
};
