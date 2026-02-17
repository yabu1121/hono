// src/util/gemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";
import { error } from "node:console";

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