import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
      studentName = "Learner",
      courseName = "AI Course",
      certificateUrl = "https://futurewithai.com/verify/FWAI-2026-DEMO",
      style = "professional",
    } = await req.json().catch(() => ({}));

    const groqApiKey = process.env.GROQ_API_KEY || "gsk_fallback_demo_key";

    const promptMessages = [
      {
        role: "system",
        content:
          "You are an AI assistant that writes engaging social media captions (LinkedIn/Facebook) for learners completing AI courses on Future With AI. Keep captions concise, engaging, and professional with appropriate emojis. Return ONLY the caption text without extra commentary or quotes.",
      },
      {
        role: "user",
        content: `Generate a ${style} social media post for ${studentName} who completed "${courseName}" on Future With AI. Verification link: ${certificateUrl}`,
      },
    ];

    let generatedPost = "";

    if (groqApiKey && !groqApiKey.startsWith("gsk_fallback")) {
      try {
        const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${groqApiKey}`,
          },
          body: JSON.stringify({
            model: "qwen/qwen3.6-27b",
            messages: promptMessages,
            temperature: 0.7,
            max_tokens: 300,
          }),
        });

        if (groqRes.ok) {
          const data = await groqRes.json();
          generatedPost = data?.choices?.[0]?.message?.content?.trim() || "";
        }
      } catch (groqErr) {
        console.warn("Groq API request error, falling back to local generator:", groqErr);
      }
    }

    // Smart fallback if Groq API key is absent or failed
    if (!generatedPost) {
      if (style === "professional") {
        generatedPost = `Excited to share that I have successfully completed the ${courseName} course on Future With AI! 🎓 This experience strengthened my understanding of AI concepts and practical implementation. Looking forward to applying these skills in real-world projects.\n\nVerify credential: ${certificateUrl} 🚀`;
      } else if (style === "motivational") {
        generatedPost = `Every milestone counts! Today I completed another step in my AI journey with Future With AI — ${courseName}. Learning never stops, and I'm excited for what's next! 💜\n\nCheck out my verified certificate: ${certificateUrl}`;
      } else {
        // casual
        generatedPost = `Just completed my ${courseName} course on Future With AI! 🎉 Learned so much and can't wait to build amazing things. 🚀\n\nView my certificate here: ${certificateUrl}`;
      }
    }

    return NextResponse.json({
      success: true,
      generatedPost,
    });
  } catch (error: any) {
    console.error("Error in generate-certificate-post route:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate AI caption." },
      { status: 500 }
    );
  }
}
