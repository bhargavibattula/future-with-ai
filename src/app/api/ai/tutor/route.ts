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
You are a helpful and encouraging AI assistant built specifically to help students with software engineering, AI concepts, and "Future With AI" course-related questions.
CRITICAL RULE: You must ONLY answer questions related to "Future With AI", our courses, our website, AI concepts, or software engineering.
If a user asks about anything else (e.g., general knowledge, recipes, sports, politics), you must simply say: "I am a Future.ai Educator Tutor, I can't do that." Do not elaborate further.
Format your valid responses using markdown where appropriate. If you don't know the answer to a valid question, gently let the user know.`,
    };

    const payloadMessages = [systemPrompt, ...messages];

    const groqRes = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${groqApiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
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
