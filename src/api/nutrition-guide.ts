import { OpenAI } from 'openai';

// Define type-safe interfaces
export interface NutritionGuideRequest {
  bmi?: number;
  calories?: number;
  category?: string;
  activityLevel?: string;
}

export interface NutritionGuideResponse {
  sections: {
    title: string;
    content: string[];
  }[];
}

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function getNutritionGuide(requestData: NutritionGuideRequest): Promise<NutritionGuideResponse> {
  try {
    // Check for API key
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey) {
      console.error('OpenAI API key is missing');
      throw new Error('OpenAI API key is not configured');
    }

    // Construct the prompt based on the request type
    let prompt = `As a nutrition expert, provide a detailed guide with specific recommendations. Format the response in clear sections.`;
    
    if (requestData.bmi !== undefined) {
      prompt += `\nBMI: ${requestData.bmi} (Category: ${requestData.category})
Focus on:
- Dietary recommendations specific to this BMI category
- Exercise recommendations
- Lifestyle adjustments
- Long-term health considerations`;
    }

    if (requestData.calories !== undefined) {
      prompt += `\nDaily Caloric Needs: ${requestData.calories} calories
Activity Level: ${requestData.activityLevel}
Focus on:
- Meal planning and timing
- Macronutrient distribution
- Pre/post workout nutrition
- Hydration guidelines`;
    }

    prompt += `\n\nProvide the response in the following JSON structure:
{
  "sections": [
    {
      "title": "section title",
      "content": ["point 1", "point 2", "point 3"]
    }
  ]
}`;

    console.log('Making OpenAI API call...');
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a professional nutritionist providing evidence-based advice. Keep recommendations practical and actionable."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "gpt-4o-mini",
      temperature: 0.7,
    });

    console.log('Received OpenAI response');
    if (!completion.choices[0]?.message?.content) {
      throw new Error('No response received from OpenAI');
    }

    const response = completion.choices[0].message.content;
    console.log('Parsing response:', response);
    
    try {
      const parsedResponse = JSON.parse(response) as NutritionGuideResponse;
      if (!parsedResponse.sections || !Array.isArray(parsedResponse.sections)) {
        throw new Error('Invalid response format');
      }
      return parsedResponse;
    } catch (error) {
      console.error('Failed to parse OpenAI response:', response);
      throw new Error('Failed to parse nutrition guide response');
    }

  } catch (error) {
    console.error('Error in nutrition guide API:', error);
    if (error instanceof Error) {
      // Check for specific error types
      if (error.message.includes('API key')) {
        throw new Error('OpenAI API key is invalid or not configured properly');
      }
      if (error.message.includes('fetch failed')) {
        throw new Error('Network error: Failed to connect to OpenAI API');
      }
      throw new Error(`Failed to generate nutrition guide: ${error.message}`);
    }
    throw new Error('Failed to generate nutrition guide');
  }
}