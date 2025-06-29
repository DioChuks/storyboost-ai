import { StoryblokStory } from '@storyblok/react/rsc';
import { getStoryblokApi } from '@/lib/storyblok';
import { Loader } from '@/components/Loader';

export default async function Page({ params }) {
  const slug = (await params.slug?.join('/')) || 'home';

  const storyblokApi = getStoryblokApi();
  try {
    const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
      version: 'draft',
    });

    if (!data.story || !data.story.content) return <Loader />;

    return <StoryblokComponent blok={data.story.content} />;
  } catch (error) {
    console.error('Error loading storyblok story:', slug, error);
    return <div className="text-center mt-20">404 - Story not found</div>;
  }
}
