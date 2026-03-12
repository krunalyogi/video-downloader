import { Router, Request, Response } from 'express';
import OpenAI from 'openai';

const router = Router();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'mock_key',
});

router.post('/captions', async (req: Request, res: Response): Promise<void> => {
    try {
        const { topic, platform, tone } = req.body;

        if (!topic) {
            res.status(400).json({ error: 'Topic is required' });
            return;
        }

        const prompt = `Write a highly engaging, viral-optimized social media caption about: "${topic}".
Platform: ${platform}
Tone: ${tone}

Requirements:
- Structure the caption with an aesthetic hook, middle value, and strong call to action.
- Include 5-10 highly relevant hashtags at the very end.
- Use emojis naturally but don't overdo it.
- Format the response with line breaks for readability.`;

        // If no real API key, return a mock response for Demo purposes
        if (process.env.OPENAI_API_KEY === 'mock_key' || !process.env.OPENAI_API_KEY) {
            setTimeout(() => {
                res.json({
                    success: true,
                    result: {
                        caption: `Feeling absolutely magical thinking about ${topic} ✨\n\nThere's something so special about hitting pause and soaking in the moment. Who else agrees?\n\nLet me know your thoughts down below! 👇`,
                        hashtags: ['#CreatorLife', `#${platform}magic`, '#Vibes', '#Aesthetic', '#MockResponse']
                    }
                });
            }, 1000);
            return;
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini", // Optimized for $0 hosting and ad-sense tier limits
            messages: [
                { role: "system", content: "You are an expert social media manager and copywriter who knows exactly how to drive engagement and virality." },
                { role: "user", content: prompt }
            ],
            temperature: 0.7,
        });

        const rawText = completion.choices[0]?.message?.content || '';

        // Simple heuristic to split text from hashtags at the bottom
        const hashtagRegex = /(?:#\w+\s*)+$/;
        const match = rawText.match(hashtagRegex);

        let caption = rawText;
        let hashtags: string[] = [];

        if (match) {
            caption = rawText.slice(0, match.index).trim();
            hashtags = match[0].match(/#\w+/g) || [];
        } else {
            // Fallback if model didn't cluster them at the end
            hashtags = rawText.match(/#\w+/g) || [];
        }

        res.json({
            success: true,
            result: {
                caption,
                hashtags,
            }
        });

    } catch (error: any) {
        console.error('[OpenAI Error]:', error.message);
        res.status(500).json({ success: false, error: 'Failed to generate content' });
    }
});

router.post('/hashtags', async (req: Request, res: Response): Promise<void> => {
    try {
        const { topic } = req.body;

        if (!topic) {
            res.status(400).json({ error: 'Topic is required' });
            return;
        }

        const prompt = `Generate exactly 30 highly relevant, trending hashtags for the following topic: "${topic}".
Instructions:
- Return ONLY a JSON object with a single key "hashtags" containing an array of strings (e.g., { "hashtags": ["#hashtag1", "#hashtag2"] }).
- Ensure they are optimized for reaching a wide audience on Instagram and TikTok.`;

        // Mock mode
        if (process.env.OPENAI_API_KEY === 'mock_key' || !process.env.OPENAI_API_KEY) {
            setTimeout(() => {
                res.json({
                    success: true,
                    result: ['#CreatorLife', '#Viral', '#Trending', '#ContentCreator', '#ExplorePage']
                });
            }, 1000);
            return;
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are an SEO algorithm expert." },
                { role: "user", content: prompt }
            ],
            temperature: 0.7,
            response_format: { type: "json_object" }
        });

        const rawText = completion.choices[0]?.message?.content || '{}';
        let hashtags: string[] = [];
        try {
           const parsed = JSON.parse(rawText);
           hashtags = parsed.hashtags || Object.values(parsed)[0] || [];
        } catch {
           hashtags = rawText.match(/#\w+/g) || [];
        }

        res.json({
            success: true,
            result: hashtags
        });

    } catch (error: any) {
        console.error('[OpenAI Error]:', error.message);
        res.status(500).json({ success: false, error: 'Failed to generate hashtags' });
    }
});

export default router;
