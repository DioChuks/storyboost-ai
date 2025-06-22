# StoryBoost - AI Blog Assistant

A Next.js application that integrates with Storyblok CMS and provides AI-powered blog writing assistance.

## Features

- **Generate Blog Titles**: AI-powered title generation based on topics
- **Expand Paragraphs**: Select text and expand it into full paragraphs
- **Content Management**: Full Storyblok CMS integration
- **Real-time Preview**: Live editing with Storyblok's Visual Editor
- **Responsive Design**: Modern, mobile-friendly interface

## Tech Stack

- Next.js 15.3.0 (App Router)
- React 19.0.0
- Storyblok React SDK 4.6.0
- Tailwind CSS 3
- Google Gemini API (for AI features)

## Setup Instructions

### 1. Create Next.js Project

```bash
npx create-next-app@15.3.0 storyboost-ai-blog
cd storyboost-ai-blog
```

Choose:
- ✅ TypeScript? No
- ✅ ESLint? Yes
- ✅ Tailwind CSS? Yes
- ✅ `src/` directory? Yes
- ✅ App Router? Yes
- ❌ Turbopack? No

### 2. Install Dependencies

```bash
npm install @storyblok/react@4.6.0 @storyblok/richtext
npm install @google/genai
```

### 3. Environment Variables

Create `.env.local`:

```env
STORYBLOK_ACCESS_TOKEN=your_preview_token_here
STORYBLOK_PREVIEW_TOKEN=your_preview_token_here
GOOGLE_GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Project Structure

```
src/
├── app/
│   ├── layout.jsx
│   ├── page.jsx
│   ├── blog/
│   │   └── [slug]/
│   │       └── page.jsx
│   └── api/
│       ├── ai/
│       │   ├── generate-titles/
│       │   │   └── route.js
│       │   └── expand-text/
│       │       └── route.js
│       └── storyblok/
│           └── webhook/
│               └── route.js
├── components/
│   ├── BlogPost.jsx
│   ├── BlogList.jsx
│   ├── AIAssistant.jsx
│   └── StoryblokProvider.jsx
└── lib/
    ├── storyblok.js
    └── gemini.js
```

---

## Deployment Notes

1. **Storyblok Setup**:
   - Create a new Storyblok space
   - Set up blog content types (Blog Post, Author, Category)
   - Configure preview URLs
   - Add webhook for real-time updates

2. **AI Integration**:
   - Get Google Gemini API key (free at https://makersuite.google.com/app/apikey)
   - Implement rate limiting for API calls
   - Add error handling and fallbacks

3. **Production**:
   - Deploy to Vercel/Netlify
   - Set up environment variables
   - Configure Storyblok webhooks for ISR

## Challenge Submission Checklist

- ✅ Meaningfully uses Storyblok features
- ✅ Incorporates AI for Amazing AI category
- ✅ Provides clear testing instructions
- ✅ Uses latest package versions specified
- ✅ Includes documentation

## Testing Instructions

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables
4. Run development server: `npm run dev`
5. Access at `http://localhost:3000`

## Demo Features

- Visit `/` for blog listing
- Visit `/blog/[slug]` for individual posts
- Use AI Assistant sidebar for title generation
- Select text to expand with AI

---

**Built for the DEV x Storyblok Challenge 2025**
