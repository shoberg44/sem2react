"use client";
import Counter from "./components/Counter";
import { useState } from "react";

export default function Home() {
  const [response, setResponse] = useState("");
  const [prompt, setPrompt] = useState("");

  const sendPrompt = async () => {
    const res = await fetch("/api/ollama", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    console.log("API Response:", data);
    setResponse(data.response || "No response");
  };

  return (
    
    <div className="flex flex-col items-center space-y-4">

      <h1 className="text-2xl font-bold mb-4">Here is my counter</h1>
      <Counter />

      <h1 className="text-2xl font-bold">Ollama AI Chat</h1>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt"
        className="px-4 py-2 border rounded text-black"
      />
      <button
        onClick={sendPrompt}
        className="px-4 py-2 bg-blue-500 text-black rounded hover:bg-blue-700"
      >
        Send
      </button>
      <div className="mt-4 p-4 border rounded bg-gray-100 text-black">
        <strong>Response:</strong> {response}
      </div>
    </div>
  );
}

