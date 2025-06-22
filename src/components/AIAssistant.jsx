'use client';
import { useState } from 'react';

export default function AIAssistant() {
  const [topic, setTopic] = useState('');
  const [titles, setTitles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [expandedText, setExpandedText] = useState('');

  const generateTitles = async () => {
    if (!topic.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/ai/generate-titles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, count: 5 }),
      });

      const data = await response.json();
      if (data.success) {
        setTitles(data.titles);
      }
    } catch (error) {
      console.error('Error generating titles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const expandText = async () => {
    if (!selectedText.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/ai/expand-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: selectedText }),
      });

      const data = await response.json();
      if (data.success) {
        setExpandedText(data.expandedText);
      }
    } catch (error) {
      console.error('Error expanding text:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        🤖 AI Assistant
      </h3>

      {/* Title Generator */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Generate Blog Titles
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter topic..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => e.key === 'Enter' && generateTitles()}
          />
          <button
            onClick={generateTitles}
            disabled={isLoading || !topic.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? '...' : '✨'}
          </button>
        </div>

        {titles.length > 0 && (
          <div className="mt-3 space-y-2">
            {titles.map((title, index) => (
              <div
                key={index}
                className="p-2 bg-gray-50 rounded text-sm cursor-pointer hover:bg-gray-100"
                onClick={() => navigator.clipboard.writeText(title)}
                title="Click to copy"
              >
                {title}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Text Expander */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Expand Text
        </label>
        <textarea
          value={selectedText}
          onChange={(e) => setSelectedText(e.target.value)}
          placeholder="Paste text to expand..."
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={expandText}
          disabled={isLoading || !selectedText.trim()}
          className="mt-2 w-full px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Expanding...' : 'Expand Text'}
        </button>

        {expandedText && (
          <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded text-sm">
            <p className="font-medium text-green-800 mb-1">Expanded:</p>
            <p className="text-green-700">{expandedText}</p>
            <button
              onClick={() => navigator.clipboard.writeText(expandedText)}
              className="mt-2 text-xs text-green-600 hover:text-green-800"
            >
              📋 Copy to clipboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
