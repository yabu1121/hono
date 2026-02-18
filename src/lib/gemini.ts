// src/util/gemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenAI } from "@google/genai";
import { getRandomPokemon } from "./pokemon";
import { getStyleByType } from "../util/get_style_type";

const BACKEND_URL = process.env.BACKEND_API_URL

export const askGemini = async (apiKey: string, prompt: string) => {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};


export const genImage = async (apiKey: string, prompt:string) => {
  const ai = new GoogleGenAI({ apiKey });
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-image",
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
  });
  const candidate = response.candidates?.[0];

  if (!candidate || !candidate.content || !candidate.content.parts) {
    throw new Error("Geminiからの有効なレスポンスが得られませんでした");
  }
  let result: { text?: string; imageBase64?: string } = {};
  for (const part of candidate.content.parts) {
    if (part.text) {
      result.text = part.text;
    } else if (part.inlineData) {
      result.imageBase64 = part.inlineData.data;
    }
  }
  return result;
}


export const createGeminiPokemonPrompt = async () => {
  try {
    const data = await getRandomPokemon();
    if (!data) throw new Error("Missing required pokemon data");

    const { name, en_name, image_url, types, features, habitat } = data;

    
    const typeList = types.split("/").map((t) => t.trim());
    const styleConfig = getStyleByType(typeList);

    const prompt = `
      You are an expert AI image prompt engineer specializing in Pokémon-style artwork.

      Generate a single, copy-paste-ready English image generation prompt for the Pokémon below.
      Output ONLY the prompt. No explanation, no labels, no extra text.

      ## Target Pokémon
      - English name: ${en_name}
      - Japanese name: ${name}
      - Type(s): ${types}
      - Key visual features: ${features}
      - Habitat: ${habitat}

      ## Style Direction
      - Art style: Pokémon TCG card illustration style, anime-inspired digital painting
      - Do NOT make it photorealistic or hyperrealistic
      - Preserve the original character design faithfully — exact colors, shape, and proportions
      - Semi-stylized with smooth cel-shading and clean outlines
      - Mood: ${styleConfig.mood}
      - Illustration style: ${styleConfig.style}

      ## Scene & Lighting
      - Setting: natural habitat scene matching the Pokémon's type and habitat
      - Pose / action: ${styleConfig.pose}
      - Lighting: soft, warm, glowing volumetric light with gentle rim lighting

      ## Quality Tags
      high detail, intricate texture, cinematic lighting, soft glow, 8k, concept art,
      digital painting, trending on ArtStation, official Pokémon art style

      ## Output Format
      One paragraph or comma-separated list. English only. No Japanese. No explanation.
    `.trim();

    return {
      prompt,
      pokemonData: data
    };
  } catch (error) {
    console.error("createGeminiPokemonPrompt Error:", error);
    return null;
  }
};