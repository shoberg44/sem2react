import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Extract the prompt from the request body
    const { prompt } = await req.json();

    // Send request to Ollama API
    const ollamaResponse = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "mistral",  // Change to the model you're using
        prompt: prompt,
        stream: false,
      }),
    });

    const data = await ollamaResponse.json();

    return NextResponse.json({ response: data.response });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch response" }, { status: 500 });
  }
}
