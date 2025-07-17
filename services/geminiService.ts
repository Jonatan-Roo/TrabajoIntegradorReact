
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
  console.warn("La variable de entorno API_KEY no está configurada. Las funciones de la API de Gemini estarán deshabilitadas.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const generateCreativeDescription = async (productTitle: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "Clave de API no configurada. Por favor, configure la variable de entorno API_KEY.";
  }

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Genera una descripción de producto corta, creativa y emocionante para un producto llamado "${productTitle}". Haz que suene atractiva para los clientes. Mantenla por debajo de 80 palabras.`,
        config: {
          temperature: 0.7,
          topP: 1,
          topK: 1,
          thinkingConfig: {
            thinkingBudget: 0,
          }
        },
    });
    
    return response.text;
  } catch (error) {
    console.error("Error al generar la descripción con la API de Gemini:", error);
    return "No se pudo generar una descripción creativa en este momento. Por favor, inténtelo de nuevo más tarde.";
  }
};
