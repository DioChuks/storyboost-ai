import { useState } from "react";
import axios from "axios";
import { storyblokEditable } from "@storyblok/react";

const AiEditor = ({ blok }) => {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("generate");

  const getInstruction = () => {
    const prompt = blok.prompt || "";
    switch (mode) {
      case "summarize":
        return `Summarize the following:\n${prompt}`;
      case "translate":
        return `Translate the following to French:\n${prompt}`;
      case "fix":
        return `Fix grammar and spelling:\n${prompt}`;
      case "outline":
        return `Create a blog outline for:\n${prompt}`;
      default:
        return `Expand this content:\n${prompt}`;
    }
  };

  const handleRun = async () => {
    setLoading(true);
    setResult("");

    try {
      const response = await axios.post(
        "https://api.deepseek.com/v1/chat/completions",
        {
          model: "deepseek-chat",
          messages: [
            {
              role: "user",
              content: getInstruction(),
            },
          ],
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_DEEPSEEK_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      setResult(response.data.choices[0].message.content);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setResult("❌ Error generating response with DeepSeek.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div {...storyblokEditable(blok)} className="p-4 border rounded max-w-xl mx-auto mt-6">
      <h2 className="text-xl font-bold mb-2">{blok.title || "AI Content Assistant"}</h2>
      <p className="mb-2 text-gray-700">
        <strong>Prompt:</strong> {blok.prompt || "(No prompt provided)"}
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
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Working..." : "Run AI Task"}
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
