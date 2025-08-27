"use client"
import Image from "next/image";
import { useState } from "react"; 
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"; // you can choose a different style

export default function Home() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const handleChat = async () => {
    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });

      const data = await res.json();
      console.log("Response:", data);
      setResponse(data.response);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 px-4 sm:px-6 lg:px-8">
      <div className="bg-white mt-3 rounded-xl shadow-lg p-6 sm:p-8 w-full max-w-md sm:max-w-lg md:max-w-2xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-purple-700">
          Get started with Chat Ai
        </h1>
        <div className="flex flex-col gap-4">
          <textarea
            className="w-full resize-none text-black border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
          />
          <button
            onClick={handleChat}
            disabled={loading}
            className={`w-full py-2 px-4 rounded-lg font-semibold bg-purple-600 text-white hover:bg-purple-700 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Loading..." : "Send"}
          </button>
        </div>
      </div>

      <div className="mt-6 w-full max-w-md sm:max-w-lg md:max-w-2xl mx-3 p-4 bg-gray-100 rounded-lg text-gray-800 prose max-w-none overflow-x-auto">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
        >
          {response}
        </ReactMarkdown>
      </div>
    </div>
  );
}
