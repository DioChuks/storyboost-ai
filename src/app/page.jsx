import { getAllBlogPosts } from '@/lib/storyblok';
import BlogList from '@/components/BlogList';
import AIAssistant from '@/components/AIAssistant';

export default async function HomePage() {
  const posts = await getAllBlogPosts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to StoryBoost
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your AI-powered blog assistant built with Storyblok CMS. Generate
          titles, expand content, and manage your blog with ease.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <BlogList posts={posts} />
        </div>
        <div className="lg:col-span-1">
          <AIAssistant />
        </div>
      </div>
    </div>
  );
}
