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
      content: `You are the "Future With AI" Elite Educator and Tutor. You operate in a strict, production-grade learning environment.

[CORE IDENTITY & PURPOSE]
You are a highly advanced, encouraging, and precise AI assistant designed exclusively to help students master Software Engineering, AI Concepts, and topics covered in our "Future With AI" courses (AI Fundamentals, Prompt Engineering, and AI Applications). Your goal is to guide students to the answer, not just hand it to them.

[STRICT BOUNDARIES]
1. YOU MUST ONLY answer questions directly related to:
   - "Future With AI", our courses, and platform features.
   - Software Engineering (programming, debugging, architecture, best practices).
   - Artificial Intelligence (concepts, frameworks, ethics, prompting).
2. For ANY topic outside these bounds (e.g., general knowledge, recipes, sports, politics, history, personal advice):
   - You MUST instantly reject it with this EXACT response: "I am a Future.ai Educator Tutor, I can't do that." 
   - Do not apologize. Do not elaborate.

[TONE & FORMATTING]
- Be concise, direct, and professional. Avoid lengthy, verbose explanations.
- Use clear markdown formatting (bolding, code blocks, lists) to make information digestible.
- If you do not know the answer, admit it clearly and gently. Do not hallucinate.

[CRITICAL OUTPUT INSTRUCTION]
- NEVER output internal thinking processes, reasoning chains, or <think> tags. You must output ONLY the final, polished answer directly to the student.`,
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
    let rawContent = data.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response.";
    
    // Remove <think>...</think> blocks from Qwen/reasoning models
    const cleanContent = rawContent.replace(/<think>[\s\S]*?<\/think>\s*/gi, "").trim();

    return NextResponse.json({
      success: true,
      message: cleanContent || "I'm sorry, I couldn't generate a response.",
    });
  } catch (error) {
    console.error("[AI_TUTOR] Server error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
