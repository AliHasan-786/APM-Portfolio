import OpenAI from 'openai';

const openai = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: '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'
});

async function test() {
    try {
        const response = await openai.chat.completions.create({
            model: 'openai/gpt-oss-120b:free',
            messages: [{ role: 'user', content: 'Return exactly {"hello":"world"} and no other text.' }]
        });
        console.log("RESPONSE:", response.choices[0].message.content);
    } catch (e) {
        console.error("ERROR:", e);
    }
}
test();
