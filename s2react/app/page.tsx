"use client";
import Counter from "./components/Counter";
import { useState } from "react";

export default function Home() {
  
  const [file, setFile] = useState(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    
    if (e.target.files == null) return;
    
    const file = e.target.files[0]; // Get the first uploaded file

    const reader = new FileReader(); // Create a new FileReader instance
    reader.onload = (event) => {
      const content = event.target.result; // Get file content as text
      
      setFile(content); // Store file name in state
      //setFileContent(content); // state not yet implemented
    }

    // Handle different file types
    if (file.type === "application/pdf") {
      // For PDF files, we'll need server-side processing
      const formData = new FormData();
      formData.append("file", file);
      //process pdf
    } else {
      reader.readAsText(file)
    }

  }


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
      <input 
        type="file"
        onChange={handleFileChange}
        className="px-4 py-2 border rounded"
      />

      <button
        onClick={() => {
          console.log("File content:", file);
        }}
        className="px-4 py-2 bg-blue-500 text-black rounded hover:bg-blue-700"
      >
        Parse File
      </button>

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

