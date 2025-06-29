'use client';
import { storyblokEditable, StoryblokComponent } from '@storyblok/react';
import { richTextResolver } from '@storyblok/richtext';

const { render } = richTextResolver();

export default function BlogPost({ story }) {
  const { content } = story;

  return (
    <article {...storyblokEditable(content)} className="max-w-3xl mx-auto">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <time>
            {new Date(story.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          {content.category && (
            <>
              <span className="mx-2">•</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                {content.category}
              </span>
            </>
          )}
          {content.read_time && (
            <>
              <span className="mx-2">•</span>
              <span>{content.read_time} min read</span>
            </>
          )}
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
          {content.title || story.name}
        </h1>

        {content.excerpt && (
          <p className="text-xl text-gray-600 leading-relaxed">
            {content.excerpt}
          </p>
        )}

        {content.author && (
          <div className="flex items-center mt-6 pt-6 border-t border-gray-200">
            {content.author.avatar && (
              <img
                src={content.author.avatar}
                alt={content.author.name}
                className="w-12 h-12 rounded-full mr-4"
              />
            )}
            <div>
              <p className="font-medium text-gray-900">{content.author.name}</p>
              {content.author.bio && (
                <p className="text-sm text-gray-600">{content.author.bio}</p>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Featured Image */}
      {content.featured_image && (
        <div className="mb-8">
          <img
            src={content.featured_image.filename}
            alt={content.featured_image.alt || content.title}
            className="w-full h-64 sm:h-80 object-cover rounded-lg shadow-lg"
          />
          {content.featured_image.caption && (
            <p className="text-sm text-gray-600 mt-2 text-center italic">
              {content.featured_image.caption}
            </p>
          )}
        </div>
      )}

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        {content.content && (
          <div
            dangerouslySetInnerHTML={{
              __html: render(content.content),
            }}
            className="blog-content"
          />
        )}

        {/* Render Storyblok components if any */}
        {content.body &&
          content.body.map((blok) => (
            <StoryblokComponent blok={blok} key={blok._uid} />
          ))}
      </div>

      {/* Tags */}
      {content.tags && content.tags.length > 0 && (
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {content.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm hover:bg-gray-200 cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">
          ✨ Like this post?
        </h3>
        <p className="text-blue-800 mb-4">
          This content was created and managed using StoryBoost's AI-powered
          blog assistant. Generate your own engaging titles and expand your
          ideas with ease!
        </p>
        <div className="flex gap-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
            Try StoryBoost
          </button>
          <button className="bg-white text-blue-600 border border-blue-300 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-50 transition-colors">
            View More Posts
          </button>
        </div>
      </div>
    </article>
  );
}
