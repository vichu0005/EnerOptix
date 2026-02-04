
import { GoogleGenAI, Type } from "@google/genai";
import { DatasetSummary, AIInsight } from "../types";

export const getAIInsights = async (summary: DatasetSummary): Promise<AIInsight[]> => {
  // Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Analyze this energy consumption summary and provide 3 strategic insights for building management.
    Summary Data:
    - Period: ${summary.startDate.toLocaleDateString()} to ${summary.endDate.toLocaleDateString()}
    - Total Consumption: ${summary.totalConsumption.toFixed(2)} kWh
    - Average Daily: ${summary.avgDailyConsumption.toFixed(2)} kWh
    - Peak Consumption: ${summary.peakConsumption.value.toFixed(2)} kWh on ${summary.peakConsumption.date.toLocaleDateString()}
    - Category Breakdown: HVAC (${summary.categoryTotals.hvac.toFixed(2)} kWh), Lighting (${summary.categoryTotals.lighting.toFixed(2)} kWh), Appliances (${summary.categoryTotals.appliances.toFixed(2)} kWh), Electronics (${summary.categoryTotals.electronics.toFixed(2)} kWh).

    Format the response as a JSON array of objects with 'title', 'description', and 'type' (must be 'optimization', 'anomaly', or 'forecast').
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              type: { type: Type.STRING },
            },
            required: ["title", "description", "type"],
          },
        },
      },
    });

    // Directly access .text property from GenerateContentResponse
    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Gemini Insight Error:", error);
    return [
      {
        title: "Manual Observation",
        description: "The peak consumption occurred on " + summary.peakConsumption.date.toLocaleDateString() + ". Review operational logs for this period.",
        type: "anomaly"
      }
    ];
  }
};
