// src/routers/ai.ts
import { Hono } from 'hono';
import { askGemini, genImage } from '../lib/gemini';

interface GenerateRequest {
  prompt: string;
}

type Bindings = {
  GEMINI_API_KEY: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.post('/talk', async (c) => {
  const { prompt } = await c.req.json();

  const apiKey = c.env.GEMINI_API_KEY;

  if (!prompt) {
    return c.json({ error: "prompt is required" }, 400);
  }

  try {
    const text = await askGemini(apiKey, prompt);
    return c.json({ message: text });
  } catch (e: any) {
    console.error("Gemini API Error Detail:", e);
    return c.json({
      error: "Gemini APIの呼び出しに失敗しました",
      message: e.message || "不明なエラー",
      status: e.status || 500,
      details: e.response?.data || undefined
    }, 500);
  }
});


app.post('/image', async (c) => {
  const body = await c.req.json<GenerateRequest>().catch(() => null);
  if (!body || !body.prompt) {
    return c.json({ 
      error: "Invalid Request", 
      message: "プロンプトは必須項目です。" 
    }, 400);
  }
  const { prompt } = body;
  const apiKey = c.env.GEMINI_API_KEY;
  try {
    const image = await genImage(apiKey, prompt);
    return c.json({ message: image });
  } catch (e: any) {
    console.error("Gemini API Error Detail:", e);
    return c.json({
      error: "Gemini APIの呼び出しに失敗しました",
      message: e.message || "不明なエラー",
      status: e.status || 500,
      details: e.response?.data || undefined
    }, 500);
  }
});

export default app;
