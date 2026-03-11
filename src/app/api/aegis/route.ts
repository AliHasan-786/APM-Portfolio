import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.OPENROUTER_API_KEY || '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',
    defaultHeaders: {
        "HTTP-Referer": "https://tiktok-apm-portfolio.vercel.app/",
        "X-Title": "TikTok APM Portfolio"
    }
});

export async function POST(request: Request) {
    try {
        const { rules, comment } = await request.json();

        if (!rules || !comment) {
            return NextResponse.json({ error: 'Rules and comment are required' }, { status: 400 });
        }

        const systemInstruction = `
            You are "Creator Aegis", a zero-shot natural language moderation filter running on edge devices.
            A TikTok creator has defined the following personal boundaries:
            
            RULES:
            ${rules}
            
            Evaluate the incoming comment. Be highly attuned to semantic evasions, emoji usage, leetspeak, and passive-aggressive bullying that bypasses normal keyword filters.
            If it violates any rule, Block it. Otherwise, Allow it.

            You MUST output ONLY valid JSON using the exact following schema, with no markdown formatting or other text:
            {
              "action": "Allow" | "Block",
              "matchedRule": "If Blocked, cite the specific rule number that was violated, otherwise explain why it is allowed.",
              "reasoning": "A brief explanation of how the comment maps to the rule, catching evasions or implicit meanings."
            }
        `;

        const response = await openai.chat.completions.create({
            model: 'openai/gpt-oss-120b:free',
            messages: [
                { role: 'system', content: systemInstruction },
                { role: 'user', content: `Comment to evaluate: "${comment}"` }
            ],
            temperature: 0.1,
            response_format: { type: 'json_object' }
        });

        const resultText = response.choices[0]?.message?.content;
        if (!resultText) throw new Error("No text returned from OpenRouter");

        // Attempt to parse just in case it wrapped it in markdown
        let parsed;
        try {
            parsed = JSON.parse(resultText);
        } catch (e) {
            // Strip markdown block if model ignored the instruction
            const cleaned = resultText.replace(/```json/g, '').replace(/```/g, '').trim();
            parsed = JSON.parse(cleaned);
        }

        return NextResponse.json(parsed);

    } catch (error: any) {
        console.error('Error in Creator Aegis:', error);
        return NextResponse.json({ error: error.message || 'Failed to process comment' }, { status: 500 });
    }
}
