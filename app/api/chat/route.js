import Groq from "groq-sdk";
import { NextResponse } from "next/server";
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

export async function POST(request) {
    try {
        const { message } = await request.json();
        const completions = await groq.chat.completions.create({
            model:'llama-3.3-70b-versatile',
            messages: [
                {
                    role: "user",
                    content: message
                },

            ]
        });
        return NextResponse.json({
            response: completions.choices[0].message.content
        })
    } catch (error) {
  console.error("groq API Error:", error);
  return NextResponse.json(
    { error: error.message || "Unknown error" },
    { status: 500 }
  );
}

}
