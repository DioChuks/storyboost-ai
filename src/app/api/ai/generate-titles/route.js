import { generateBlogTitles } from '@/lib/gemini';

export async function POST(request) {
  try {
    const { topic, count = 5 } = await request.json();

    if (!topic) {
      return Response.json(
        { success: false, error: 'Topic is required' },
        { status: 400 }
      );
    }

    const titles = await generateBlogTitles(topic, count);

    return Response.json({ success: true, titles });
  } catch (error) {
    console.error('Error in generate-titles API:', error);
    return Response.json(
      { success: false, error: 'Failed to generate titles' },
      { status: 500 }
    );
  }
}
