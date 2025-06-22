import { GoogleGenerativeAI } from '@google/genai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST is allowed' });
  }

  const { prompt } = req.body;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return res.status(200).json({ result: text });
  } catch (err) {
    console.error('Gemini error:', err.message);
    return res.status(500).json({ error: 'Gemini generation failed' });
  }
}
