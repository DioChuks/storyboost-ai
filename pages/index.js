import Head from 'next/head';

import {
  useStoryblokState,
  getStoryblokApi,
  StoryblokComponent,
} from '@storyblok/react';
import { Loader } from '../components/Loader';

export default function Home({ story }) {
  story = useStoryblokState(story);

  if (!story || !story.content) {
    return <Loader />;
  }

  return (
    <div>
      <Head>
        <title>StoryBoost AI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StoryblokComponent blok={story.content} />
    </div>
  );
}

export async function getStaticProps() {
  let slug = 'storyboost-home';

  let sbParams = {
    version: 'draft', // or 'published'
  };

  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);

  return {
    props: {
      story: data ? data.story : false,
      key: data ? data.story.id : false,
    },
    revalidate: 3600,
  };
}
