'use client';

import { useState } from 'react';
import { storyblokEditable } from '@storyblok/react';

const AiEditor = ({ blok }) => {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('generate');

  const getInstruction = () => {
    const prompt = blok.prompt || '';
    switch (mode) {
      case 'summarize':
        return `Summarize the following:\n${prompt}`;
      case 'translate':
        return `Translate the following to French:\n${prompt}`;
      case 'fix':
        return `Fix grammar and spelling:\n${prompt}`;
      case 'outline':
        return `Create a blog outline for:\n${prompt}`;
      default:
        return `Expand this content:\n${prompt}`;
    }
  };

  const handleRun = async () => {
    setLoading(true);
    setResult('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: getInstruction() }),
      });

      const data = await response.json();
      setResult(data.result);
    } catch (err) {
      console.error('Failed:', err);
      setResult('❌ Failed to generate content');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      {...storyblokEditable(blok)}
      className="p-4 border rounded max-w-xl mx-auto mt-6"
    >
      <h2 className="text-xl font-bold mb-2">
        {blok.title || 'AI Content Assistant'}
      </h2>
      <p className="mb-2 text-gray-700">
        <strong>Prompt:</strong> {blok.prompt || '(No prompt provided)'}
      </p>

      <label className="block mb-2">
        <span className="font-semibold">Select Action:</span>
        <select
          className="block mt-1 w-full border px-2 py-1 rounded"
          value={mode}
          onChange={(e) => setMode(e.target.value)}
        >
          <option value="generate">✨ Generate</option>
          <option value="summarize">📝 Summarize</option>
          <option value="translate">🌍 Translate to French</option>
          <option value="fix">🧹 Fix Grammar</option>
          <option value="outline">📋 Blog Outline</option>
        </select>
      </label>

      <button
        onClick={handleRun}
        disabled={loading}
        className="animated-button"
      >
        <svg
          viewBox="0 0 24 24"
          className="arr-2"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
        </svg>
        <span className="text">{loading ? 'Working...' : 'Run AI Task'}</span>
        <span className="circle"></span>
        <svg
          viewBox="0 0 24 24"
          className="arr-1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
        </svg>
      </button>

      {result && (
        <div className="mt-4 bg-gray-100 border p-3 rounded whitespace-pre-line">
          <h4 className="font-semibold mb-1">AI Response:</h4>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default AiEditor;
