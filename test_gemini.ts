import { GoogleGenAI, Type, Schema, HarmCategory, HarmBlockThreshold } from '@google/genai';
require('dotenv').config({ path: '.env.local' });

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const aegisSchema: Schema = {
    type: Type.OBJECT,
    properties: {
        action: {
            type: Type.STRING,
            enum: ['Allow', 'Block'],
            description: 'Whether to allow or block the comment based on the rules.'
        },
        matchedRule: {
            type: Type.STRING,
            description: 'If Blocked, cite the specific rule number that was violated.'
        },
        reasoning: {
            type: Type.STRING,
            description: 'A brief explanation of how the comment maps to the rule, catching evasions or implicit meanings.'
        }
    },
    required: ['action', 'reasoning']
};

async function test() {
    const rules = "1. Block anyone criticizing my weight or body shape.\n2. Hide comments that mention my ex-boyfriend Alex.\n3. Remove spam asking me to check out their soundcloud.";
    const comment = "fatfuckingshit";

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Comment to evaluate: "${comment}"`,
            config: {
                systemInstruction: `
                    You are "Creator Aegis", a zero-shot natural language moderation filter running on edge devices.
                    A creator has defined the following personal boundaries:
                    RULES:
                    ${rules}
                    Evaluate the incoming comment. Be highly attuned to semantic evasions, emoji usage, leetspeak, and passive-aggressive bullying that bypasses normal keyword filters.
                    If it violates any rule, Block it. Otherwise, Allow it.
                `,
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
        console.log("RESPONSE:", response.text);
    } catch (e) {
        console.error("ERROR:", e);
    }
}

test();
