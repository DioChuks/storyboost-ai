import Link from 'next/link';

export default function BlogList({ posts }) {
  if (!posts.length) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No blog posts found
        </h3>
        <p className="text-gray-600">
          Create your first blog post in Storyblok to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Posts</h2>
      {posts.map((post) => (
        <article
          key={post.uuid}
          className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <time>{new Date(post.created_at).toLocaleDateString()}</time>
            {post.content.category && (
              <>
                <span className="mx-2">•</span>
                <span className="text-blue-600">{post.content.category}</span>
              </>
            )}
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            <Link
              href={`/blog/${post.slug}`}
              className="hover:text-blue-600 transition-colors"
            >
              {post.content.title || post.name}
            </Link>
          </h3>

          {post.content.excerpt && (
            <p className="text-gray-600 mb-4 line-clamp-3">
              {post.content.excerpt}
            </p>
          )}

          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            Read more
            <svg
              className="ml-1 w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </article>
      ))}
    </div>
  );
}
