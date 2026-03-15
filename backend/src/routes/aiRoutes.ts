import { Router, Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = Router();

// Initialize Gemini — free tier via Google AI Studio
const getGemini = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;
    const genAI = new GoogleGenerativeAI(apiKey);
    return genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
};

// ── POST /api/ai/captions ────────────────────────────────────────────────────
router.post('/captions', async (req: Request, res: Response): Promise<void> => {
    try {
        const { topic, platform, tone } = req.body;

        if (!topic) {
            res.status(400).json({ error: 'Topic is required' });
            return;
        }

        const prompt = `You are an expert social media copywriter who crafts viral content.

Write a highly engaging social media caption about: "${topic}"
Platform: ${platform}
Tone: ${tone}

Requirements:
- Start with a scroll-stopping hook.
- Add value or storytelling in the middle.
- End with a strong call to action (question or directive).
- Use emojis naturally but don't overdo it.
- Finish with 8-10 highly relevant hashtags on a new line.
- Format the caption with line breaks for readability.

Return ONLY the caption text. Do not add any preamble or explanation.`;

        const model = getGemini();

        // No API key — return a mock response so the UI still works
        if (!model) {
            setTimeout(() => {
                res.json({
                    success: true,
                    result: {
                        caption: `Feeling absolutely magical thinking about ${topic} ✨\n\nThere's something so special about hitting pause and soaking in the moment. Who else agrees?\n\nLet me know your thoughts down below! 👇`,
                        hashtags: ['#CreatorLife', `#${platform}`, '#Vibes', '#Aesthetic', '#FreeDemo']
                    }
                });
            }, 800);
            return;
        }

        const result = await model.generateContent(prompt);
        const rawText = result.response.text();

        // Split caption body from hashtags
        const hashtagRegex = /(\n+)((?:#\w+\s*)+)$/;
        const match = rawText.match(hashtagRegex);

        let caption = rawText.trim();
        let hashtags: string[] = [];

        if (match && match.index !== undefined) {
            caption = rawText.slice(0, match.index).trim();
            hashtags = match[2].match(/#\w+/g) || [];
        } else {
            // Fallback: extract any hashtags from the full text
            hashtags = rawText.match(/#\w+/g) || [];
            caption = rawText.replace(/#\w+/g, '').trim();
        }

        res.json({ success: true, result: { caption, hashtags } });

    } catch (error: any) {
        console.error('[Gemini Error - captions]:', error.message);
        res.status(500).json({ success: false, error: 'Failed to generate caption' });
    }
});

// ── POST /api/ai/hashtags ─────────────────────────────────────────────────────
router.post('/hashtags', async (req: Request, res: Response): Promise<void> => {
    try {
        const { topic } = req.body;

        if (!topic) {
            res.status(400).json({ error: 'Topic is required' });
            return;
        }

        const prompt = `Generate exactly 30 highly relevant, trending hashtags for the topic: "${topic}".

Rules:
- Return ONLY a raw JSON array of strings, nothing else.
- Each hashtag must start with "#".
- Mix popular (1M+ posts), mid-range (100K-1M), and niche (10K-100K) hashtags.
- Optimize for Instagram and TikTok reach in 2026.

Example format: ["#hashtag1", "#hashtag2", ...]`;

        const model = getGemini();

        // Mock fallback
        if (!model) {
            setTimeout(() => {
                res.json({
                    success: true,
                    result: ['#CreatorLife', '#Viral', '#Trending', '#ContentCreator', '#ExplorePage', '#FYP', '#Reels', '#TikTok', '#Instagram', '#GrowthHacking']
                });
            }, 800);
            return;
        }

        const result = await model.generateContent(prompt);
        const rawText = result.response.text().trim();

        let hashtags: string[] = [];
        try {
            // Remove markdown code fences if Gemini wraps in ```json ... ```
            const cleaned = rawText.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim();
            hashtags = JSON.parse(cleaned);
        } catch {
            // Fallback: extract hashtags from plain text
            hashtags = rawText.match(/#\w+/g) || [];
        }

        res.json({ success: true, result: hashtags });

    } catch (error: any) {
        console.error('[Gemini Error - hashtags]:', error.message);
        res.status(500).json({ success: false, error: 'Failed to generate hashtags' });
    }
});

export default router;
