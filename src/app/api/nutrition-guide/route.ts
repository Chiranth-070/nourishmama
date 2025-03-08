import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

// Define type-safe interfaces
interface NutritionGuideRequest {
  bmi?: number;
  calories?: number;
  category?: string;
  activityLevel?: string;
}

interface NutritionGuideResponse {
  sections: {
    title: string;
    content: string[];
  }[];
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body: NutritionGuideRequest = await request.json();
    
    // Construct the prompt based on the request type
    let prompt = `As a nutrition expert, provide a detailed guide with specific recommendations. Format the response in clear sections.`;
    
    if (body.bmi !== undefined) {
      prompt += `\nBMI: ${body.bmi} (Category: ${body.category})
Focus on:
- Dietary recommendations specific to this BMI category
- Exercise recommendations
- Lifestyle adjustments
- Long-term health considerations`;
    }

    if (body.calories !== undefined) {
      prompt += `\nDaily Caloric Needs: ${body.calories} calories
Activity Level: ${body.activityLevel}
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
      model: "gpt-4-turbo-preview",
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const response = completion.choices[0].message.content;
    if (!response) {
      throw new Error('No response from OpenAI');
    }

    const parsedResponse: NutritionGuideResponse = JSON.parse(response);
    return NextResponse.json(parsedResponse);

  } catch (error) {
    console.error('Error in nutrition guide API:', error);
    return NextResponse.json(
      { error: 'Failed to generate nutrition guide' },
      { status: 500 }
    );
  }
} 