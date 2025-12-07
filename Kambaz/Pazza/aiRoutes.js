import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

export default function PazzaAIRoutes(app) {

    const generateAIAnswer = async (req, res) => {
        try {
            const { postId } = req.params;
            const { title, content, tags, category } = req.body;

            const prompt = `You are a helpful teaching assistant. A student has posted the following question in a ${category} category (tags: ${tags.join(', ')}):

Title: ${title}

Question: ${content}

Please provide a clear, helpful answer. Be concise but thorough. If it's a technical question, provide code examples if relevant. If you're not certain about something, say so.`;

            const completion = await groq.chat.completions.create({
                messages: [
                    {
                        role: "system",
                        content: "You are a knowledgeable teaching assistant helping students with programming, computer science, and academic questions. Provide clear, accurate, and helpful responses."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                model: "llama-3.3-70b-versatile", // Free tier model
                temperature: 0.7,
                max_tokens: 1024,
            });

            const aiAnswer = completion.choices[0]?.message?.content || "I apologize, but I couldn't generate an answer at this time.";

            res.json({
                answer: aiAnswer,
                model: "llama-3.3-70b-versatile",
                timestamp: new Date().toISOString()
            });

        } catch (error) {
            console.error("AI generation error:", error);
            res.status(500).json({ error: "Failed to generate AI answer" });
        }
    };

    const markAsResolved = async (req, res) => {
        try {
            const { postId } = req.params;
            const { resolvedByAI } = req.body;

            // You can update the post to mark it as AI-resolved
            // This will notify faculty that they don't need to review it

            // TODO: Update post schema to include resolvedByAI flag
            // For now, just return success

            res.json({ success: true, resolvedByAI });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    app.post("/api/pazza/posts/:postId/ai-answer", generateAIAnswer);
    app.post("/api/pazza/posts/:postId/resolve", markAsResolved);
}