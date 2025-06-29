import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req) {
  const body = await req.json();
  const prompt = body.prompt;

  try {
    const response = await genAI.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    const text = response.text;
    return NextResponse.json({ result: text });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to generate content.' },
      { status: 500 }
    );
  }
}
