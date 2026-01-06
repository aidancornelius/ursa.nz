import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection, getEntry } from 'astro:content';
import { renderOgImage } from '../../../lib/og';

export const getStaticPaths: GetStaticPaths = async () => {
  const films = await getCollection('films', ({ data }) => !data.draft);
  return films.map((film) => ({
    params: { id: film.id.replace(/\.md$/, '') },
    props: {
      title: film.data.title,
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
