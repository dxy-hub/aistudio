import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const sendMessageToGemini = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are the Handan Intelligent Inquiry Assistant (邯郸智能问询助手). You help citizens with government policies, administrative procedures, and general city inquiries. Keep your answers concise, helpful, and polite. Answer in Chinese.",
      }
    });
    
    return response.text || "抱歉，我现在无法回答这个问题，请稍后再试。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "系统繁忙，请稍后重试。";
  }
};