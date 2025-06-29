import Head from 'next/head';
import {
  useStoryblokState,
  getStoryblokApi,
  StoryblokComponent,
} from '@storyblok/react';
import { Loader } from '../components/Loader';
import Layout from '../components/Layout';

export default function DynamicPage({ story }) {
  story = useStoryblokState(story);

  if (!story || !story.content) return <Loader />;

  return (
    <Layout>
      <Head>
        <title>{story.content.title || 'StoryBoost AI'}</title>
      </Head>
      <StoryblokComponent blok={story.content} />
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const slug = params?.slug?.join('/') || 'home'; // 👈 default to 'home' for '/'
  const storyblokApi = getStoryblokApi();

  try {
    const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
      version: 'draft',
    });

    return {
      props: {
        story: data.story,
      },
      revalidate: 3600,
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
}

export async function getStaticPaths() {
  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get('cdn/links/');

  const paths = [];

  Object.keys(data.links).forEach((key) => {
    const slug = data.links[key].slug;

    if (slug === 'home' || data.links[key].is_folder) return;

    paths.push({ params: { slug: slug.split('/') } });
  });

  return {
    paths,
    fallback: false,
  };
}
