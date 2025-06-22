import { getStoryblokData } from '@/lib/storyblok';
import BlogPost from '@/components/BlogPost';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const story = await getStoryblokData(`blog/${params.slug}`);

  if (!story) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: story.content.title || story.name,
    description: story.content.excerpt || 'Blog post from StoryBoost',
  };
}

export default async function BlogPostPage({ params }) {
  const story = await getStoryblokData(`blog/${params.slug}`);

  if (!story) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <BlogPost story={story} />
    </div>
  );
}
