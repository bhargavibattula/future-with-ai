import { NextResponse } from "next/server";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { success: false, message: "Valid messages array is required." },
        { status: 400 }
      );
    }

    const groqApiKey = process.env.GROQ_API_KEY || "gsk_fallback_demo_key";

    if (!groqApiKey || groqApiKey.startsWith("gsk_fallback")) {
      return NextResponse.json({
        success: true,
        message: "Hi! This is a demo fallback response because a valid GROQ_API_KEY was not found in your environment variables. Please add one to use the live AI Tutor!",
      });
    }

    // System prompt setup
    const systemPrompt = {
      role: "system",
      content: `You are the "Future With AI" Educator and Tutor.
You help students with software engineering, AI concepts, and any questions about our courses.
Our catalog includes courses on AI fundamentals, prompt engineering, and AI applications.
CRITICAL RULE: Answer only short, direct doubts about these courses. For unrelated topics respond with "I am a Future.ai Educator Tutor, I can't do that."
Keep responses concise and focused. Use markdown formatting when appropriate.`,
    };

    const payloadMessages = [systemPrompt, ...messages];

    const groqRes = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${groqApiKey}`,
      },
      body: JSON.stringify({
        model: "qwen/qwen3.6-27b",
        messages: payloadMessages,
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!groqRes.ok) {
      const errorText = await groqRes.text();
      console.error("[AI_TUTOR] Groq API Error:", errorText);
      let errorMessage = "Failed to communicate with AI service.";
      try {
        const parsed = JSON.parse(errorText);
        if (parsed?.error?.message) {
          errorMessage = parsed.error.message;
        }
      } catch (e) {}
      
      return NextResponse.json(
        { success: false, message: errorMessage },
        { status: 502 }
      );
    }

    const data = await groqRes.json();

    return NextResponse.json({
      success: true,
      message: data.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response.",
    });
  } catch (error) {
    console.error("[AI_TUTOR] Server error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
