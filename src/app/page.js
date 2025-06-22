import { Loader } from '@/components/Loader';
import { getStoryblokApi } from '@/lib/storyblok';
import { StoryblokStory } from '@storyblok/react/rsc';

export default async function Home() {
	const { data } = await fetchData();

	if (!data.story || !data.story.content) return <Loader />;

	return (
		<div className="page">
			<StoryblokStory story={data.story} />
		</div>
	);
}

export async function fetchData() {
const storyblokApi = getStoryblokApi();
return await storyblokApi.get(`cdn/stories/home`, { version: 'draft' });
}
