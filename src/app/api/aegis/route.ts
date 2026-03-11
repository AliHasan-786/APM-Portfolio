import { NextResponse } from 'next/server';
import { GoogleGenAI, Type, Schema, HarmCategory, HarmBlockThreshold } from '@google/genai';

const aegisSchema: Schema = {
    type: Type.OBJECT,
    properties: {
        action: {
            type: Type.STRING,
            enum: ['Allow', 'Block'],
            description: 'Whether to allow or block the comment based on the formulated rules.'
        },
        matchedRule: {
            type: Type.STRING,
            description: 'The specific rule violated or "None".'
        },
        reasoning: {
            type: Type.STRING,
            description: 'Explanation for why it was blocked or allowed.'
        }
    },
    required: ['action', 'reasoning']
};

export async function POST(request: Request) {
    try {
        const { rules, comment } = await request.json();

        if (!rules || !comment) {
            return NextResponse.json({ error: 'Rules and comment are required' }, { status: 400 });
        }

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json({ error: 'GEMINI_API_KEY is not configured on the server.' }, { status: 500 });
        }

        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const systemInstruction = `
            You are "Creator Aegis", a zero-shot natural language moderation filter running on edge devices.
            A TikTok creator has defined the following personal boundaries:
            
            RULES:
            ${rules}
            
            Evaluate the incoming comment against these rules contextually. Be highly attuned to semantic evasions, geopolitics, emoji usage, leetspeak, and passive-aggressive bullying that bypasses normal keyword filters.
            If it violates ANY rule explicitly or implicitly, Block it. Otherwise, Allow it.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Comment to evaluate: "${comment}"`,
            config: {
                systemInstruction,
                responseMimeType: 'application/json',
                responseSchema: aegisSchema,
                temperature: 0.1,
                safetySettings: [
                    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
                    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
                    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
                    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE }
                ]
            }
        });

        if (!response.text) {
            throw new Error("Empty response received from Gemini LLM");
        }

        return NextResponse.json(JSON.parse(response.text));

    } catch (error: any) {
        console.error('Error in Creator Aegis:', error);
        return NextResponse.json({ error: error.message || 'Failed to process comment. Ensure your API Key has quota left.' }, { status: 500 });
    }
}
