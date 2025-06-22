import { getStoryblokApi, StoryblokComponent } from "@storyblok/react/rsc";

export default async function Page({ params }) {
  const slug = params.slug?.join("/") || "home";

  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
    version: "draft",
  });

  return <StoryblokComponent blok={data.story.content} />;
}
