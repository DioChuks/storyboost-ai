import { Inter } from 'next/font/google';
import './globals.css';
import StoryblokProvider from '@/components/StoryblokProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'StoryBoost AI',
  description: 'Your AI-powered Storyblok companion',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoryblokProvider>
          <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm border-b">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-6">
                  <div className="flex items-center">
                    <h1 className="text-2xl font-bold text-gray-900">
                      📝 StoryBoost
                    </h1>
                    <span className="ml-2 text-sm text-gray-500">
                      AI Blog Assistant
                    </span>
                  </div>
                  <nav className="flex space-x-8">
                    <a href="/" className="text-gray-600 hover:text-gray-900">
                      Home
                    </a>
                    <a
                      href="/blog"
                      className="text-gray-600 hover:text-gray-900"
                    >
                      Blog
                    </a>
                  </nav>
                </div>
              </div>
            </header>
            <main>{children}</main>
            <footer className="bg-white border-t mt-12">
              <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <p className="text-center text-gray-500 text-sm">
                  Built with Storyblok & AI for the DEV Challenge 2025
                </p>
              </div>
            </footer>
          </div>
        </StoryblokProvider>
      </body>
    </html>
  );
}
