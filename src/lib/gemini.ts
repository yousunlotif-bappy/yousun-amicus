import { GoogleGenAI } from "@google/genai";

/*
  Gemini helper for YOUSUN Amicus.

  This file keeps Gemini text generation in one place.
  Later, report generator, agent tools, and API routes can reuse this helper
  instead of writing Gemini setup again and again.
*/

const MODEL_NAME = "gemini-2.5-flash";

function hasGeminiKey(): boolean {
  return Boolean(process.env.GEMINI_API_KEY);
}

export async function generateGeminiText(prompt: string): Promise<string> {
  /*
    We keep this check here so the app fails clearly during setup.
    Without this, the error message can become confusing.
  */
  if (!hasGeminiKey()) {
    throw new Error("Missing GEMINI_API_KEY. Please add it to your .env.local file.");
  }

  /*
    Create the Gemini client.
    The SDK will read GEMINI_API_KEY from environment variables.
  */
  const ai = new GoogleGenAI({});

  /*
    Generate text from Gemini.
    Lower temperature keeps the output more stable and professional,
    which is better for bank reports and decision-support text.
  */
  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: prompt,
    config: {
      temperature: 0.35,
      topP: 0.9,
      maxOutputTokens: 1400,
    },
  });

  const generatedText = response.text;

  /*
    Safety check:
    Sometimes an API response can be empty because of configuration,
    safety filtering, or temporary API issues.
  */
  if (!generatedText) {
    throw new Error("Gemini returned an empty response.");
  }

  return generatedText.trim();
}

