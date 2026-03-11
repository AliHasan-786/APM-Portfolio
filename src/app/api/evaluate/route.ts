import { NextResponse } from 'next/server';
import { GoogleGenAI, Type, Schema } from '@google/genai';

// Initialize the Gemini client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Define the expected output schema for the LLM Performance Predictor (LPP)
const lppSchema: Schema = {
    type: Type.OBJECT,
    properties: {
        predictedAction: {
            type: Type.STRING,
            enum: ['Auto-Takedown', 'Auto-Approve', 'Escalate'],
            description: 'The routing decision based on policy and confidence.'
        },
        confidenceScore: {
            type: Type.NUMBER,
            description: 'A decimal between 0.0 and 1.0 representing the model\'s internal confidence in its decision. Below 0.90 should generally Escalate.'
        },
        uncertaintyType: {
            type: Type.STRING,
            enum: ['Aleatoric', 'Epistemic', 'None'],
            description: 'Aleatoric (missing factual evidence) or Epistemic (policy ambiguity/gap). Use None if confident.'
        },
        uncertaintyReason: {
            type: Type.STRING,
            description: 'If Escalate, explain exactly why the AI is confused or lacks context to make a definitive ruling.'
        },
        policyViolation: {
            type: Type.STRING,
            description: 'If Auto-Takedown, state the specific policy violated (e.g., "Violent Extremism", "Hate Speech").'
        },
        mockRagSources: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    source: { type: Type.STRING },
                    content: { type: Type.STRING },
                    relevanceScore: { type: Type.NUMBER }
                }
            },
            description: 'Generate 1-3 highly realistic-sounding RAG document snippets that the system theoretically retrieved to make this decision.'
        }
    },
    required: ['predictedAction', 'confidenceScore', 'uncertaintyType', 'mockRagSources']
};

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { claim, systemInstruction: customInstruction } = body;

        if (!claim) {
            return NextResponse.json({ error: 'Claim text is required' }, { status: 400 });
        }

        if (!process.env.GEMINI_API_KEY) {
            console.error("GEMINI_API_KEY is not set in environment variables");
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
        }

        const defaultInstruction = `
      You are the core logic engine of TrustScore-RAG, a state-of-the-art content moderation routing system for a major social media platform (like TikTok).
      Your job is NOT just to moderate content, but to calculate an LLM Performance Predictor (LPP) score.
      
      You must evaluate the user's input claim against strict platform policies (Violent Extremism, Hate Speech, Civic Integrity, Suicide/Self-Harm, Regulated Goods, Medical Misinfo).
      
      RULES:
      1. If it is clearly violating (e.g., threats, slurs, dangerous acts, buying/selling drugs, fake election dates): 
         - predictedAction: "Auto-Takedown"
         - confidenceScore: > 0.95
         - uncertaintyType: "None"
         - Generate relevant mock RAG sources backing up the ban.
         
      2. If it is completely benign (e.g., standard creator vlogs, general opinions):
         - predictedAction: "Auto-Approve"
         - confidenceScore: > 0.90
         - uncertaintyType: "None"
         
      3. EDGES CASES (The most important part of your job):
         If the claim is ambiguous, relies on unverified news, satirizes a protected group, discusses changing medical research, or mentions newly enacted vague laws (e.g., EU synthetic media bans):
         - predictedAction: "Escalate"
         - confidenceScore: < 0.89
         - uncertaintyType: Choose either "Aleatoric" (we lack the factual grounding/evidence to know if it's true) OR "Epistemic" (we lack a clear policy directive for this specific nuance).
         - uncertaintyReason: Explain the gap explicitly for a human operator to read.
         - Generate mock RAG sources that CONFLICT or show the ambiguity.
         
      Always respond in the requested JSON schema.
    `;

        const systemInstruction = customInstruction || defaultInstruction;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Evaluate this claim: "${claim}"`,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: 'application/json',
                responseSchema: lppSchema,
                temperature: 0.2 // keep it relatively deterministic
            }
        });

        const resultText = response.text;
        if (!resultText) {
            throw new Error("No text returned from Gemini");
        }

        const parsedResult = JSON.parse(resultText);

        return NextResponse.json(parsedResult);

    } catch (error) {
        console.error('Error generating LPP assessment:', error);
        return NextResponse.json({ error: 'Failed to process claim' }, { status: 500 });
    }
}
