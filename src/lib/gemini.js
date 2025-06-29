import { GoogleGenAI } from '@google/genai';

const genAI = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GEMINI_API_KEY,
});

export async function generateBlogTitles(topic, count = 5) {
  try {
    const prompt = `Generate ${count} creative and engaging blog titles about: ${topic}

    Requirements:
    - Make them catchy and SEO-friendly
    - Vary the styles (how-to, listicle, question, etc.)
    - Keep them under 60 characters when possible
    - Make them click-worthy but not clickbait

    Format: Return only the titles, one per line, without numbers or bullets.`;

    const response = await genAI.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const text = response.text;
    const titles = text
      .split('\n')
      .filter((line) => line.trim())
      .map((line) => line.replace(/^\d+\.\s*/, '').trim())
      .slice(0, count);

    return titles;
  } catch (error) {
    console.error('Error generating titles:', error);
    throw new Error('Failed to generate titles');
  }
}

export async function expandText(text, context = '') {
  try {
    const prompt = `Expand this text into a full, well-structured paragraph while maintaining the original meaning and tone:

    "${text}"

    ${context ? `Context: ${context}` : ''}

    Requirements:
    - Keep the same tone and style
    - Add relevant details and examples
    - Make it flow naturally
    - Aim for 3-5 sentences
    - Don't change the core message

    Return only the expanded paragraph, no additional formatting or commentary.`;
    const response = await genAI.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    const expandedText = response.text.trim();

    return expandedText;
  } catch (error) {
    console.error('Error expanding text:', error);
    throw new Error('Failed to expand text');
  }
}
