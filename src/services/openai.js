import axios from "axios";

const openaiApi = axios.create({
  baseURL: "https://api.openai.com/v1",
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
    "Content-Type": "application/json",
  },
});

export const generateContent = async (prompt) => {
  const res = await openaiApi.post("/chat/completions", {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  return res.data.choices[0].message.content;
};
