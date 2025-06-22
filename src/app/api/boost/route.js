import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from '@google/genai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

export async function POST(req) {
  const body = await req.json();
  const prompt = body.prompt;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return NextResponse.json({ result: text });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to generate content." }, { status: 500 });
  }
}
