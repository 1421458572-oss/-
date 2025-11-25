import { GoogleGenAI, Type, Modality } from "@google/genai";
import { AnalysisResult, PartOfSpeech } from "../types";

// Helper to decode base64 audio
async function decodeAudioData(
  base64Data: string,
  audioContext: AudioContext
): Promise<AudioBuffer> {
  const binaryString = atob(base64Data);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return await audioContext.decodeAudioData(bytes.buffer);
}

export const analyzeJapaneseText = async (text: string): Promise<AnalysisResult> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    Analyze the following Japanese text for a Chinese learner.
    1. Break the text into morphological tokens.
    2. For each token, provide:
       - Surface form (the word as it appears)
       - Reading (in Hiragana/Katakana)
       - Romaji (Hepburn style, lowercase)
       - Part of Speech (Map strictly to: Noun, Verb, Adjective, Adverb, Particle, Auxiliary Verb, Punctuation, Other)
       - Meaning (Brief definition in Chinese)
    3. Provide a full natural translation of the sentence into Chinese.
    
    Text to analyze:
    "${text}"
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tokens: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  surface: { type: Type.STRING },
                  reading: { type: Type.STRING },
                  romaji: { type: Type.STRING },
                  pos: { 
                    type: Type.STRING,
                    enum: [
                      PartOfSpeech.NOUN,
                      PartOfSpeech.VERB,
                      PartOfSpeech.ADJECTIVE,
                      PartOfSpeech.ADVERB,
                      PartOfSpeech.PARTICLE,
                      PartOfSpeech.AUXILIARY_VERB,
                      PartOfSpeech.PUNCTUATION,
                      PartOfSpeech.OTHER
                    ]
                  },
                  meaning: { type: Type.STRING },
                },
                required: ['surface', 'reading', 'romaji', 'pos', 'meaning']
              }
            },
            translation: { type: Type.STRING }
          },
          required: ['tokens', 'translation']
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    return result as AnalysisResult;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw new Error("Failed to analyze text.");
  }
};

export const speakJapaneseText = async (text: string): Promise<void> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing.");
  }
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-tts',
      contents: `Read this Japanese text naturally: ${text}`,
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' }, // Kore is a good Japanese-sounding voice usually, or we let it default
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    
    if (!base64Audio) {
      throw new Error("No audio data received.");
    }

    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const audioBuffer = await decodeAudioData(base64Audio, audioContext);
    
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start();

  } catch (error) {
    console.error("TTS Error:", error);
    throw new Error("Failed to generate speech.");
  }
};
