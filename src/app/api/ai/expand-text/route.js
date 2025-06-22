import { expandText } from '@/lib/gemini';

export async function POST(request) {
  try {
    const { text, context = '' } = await request.json();

    if (!text) {
      return Response.json(
        { success: false, error: 'Text is required' },
        { status: 400 }
      );
    }

    const expandedText = await expandText(text, context);

    return Response.json({ success: true, expandedText });
  } catch (error) {
    console.error('Error in expand-text API:', error);
    return Response.json(
      { success: false, error: 'Failed to expand text' },
      { status: 500 }
    );
  }
}
