import { apiPlugin, storyblokInit } from '@storyblok/react/rsc';

export const getStoryblokApi = storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  apiOptions: {
    region: 'eu',
  },
});

const storyblokApi = getStoryblokApi();

export async function getStoryblokData(slug, preview = false) {
  const version = preview ? 'draft' : 'published';

  try {
    const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
      version,
      resolve_links: 'url',
    });
    return data.story;
  } catch (error) {
    console.error('Error fetching Storyblok data:', error);
    return null;
  }
}

export async function getAllBlogPosts() {
  try {
    const { data } = await storyblokApi.get('cdn/stories', {
      starts_with: 'blog/',
      version: 'published',
      sort_by: 'created_at:desc',
    });
    return data.stories;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}
