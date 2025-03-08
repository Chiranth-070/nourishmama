import { Button } from "@/components/ui/button";
import { ChevronRight, Apple, Salad, RotateCw } from "lucide-react";
import { useState } from "react";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
import { toast } from "sonner";

const TipSchema = z.object({
  tip: z.string(),
  category: z.string()
}).required();

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const Hero = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [tip, setTip] = useState("Focus on eating a rainbow of fruits and vegetables daily to ensure you're getting a diverse range of nutrients essential for hormone balance and overall well-being.");

  const generateNewTip = async () => {
    try {
      setIsGenerating(true);
      
      const completion = await openai.beta.chat.completions.parse({
        messages: [
          {
            role: "system",
            content: "You are a professional nutritionist providing evidence-based nutrition tips for women's health."
          },
          {
            role: "user",
            content: "Generate a concise, practical nutrition tip for women's health and wellness."
          }
        ],
        model: "gpt-4o-mini",
        temperature: 0.7,
        response_format: zodResponseFormat(TipSchema, "nutritionTip")
      });

      setTip(completion.choices[0].message.parsed.tip);
    } catch (error) {
      console.error('Error generating tip:', error);
      toast.error("Failed to generate new tip", {
        description: "Please try again later."
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-sage-50 to-white py-12 md:py-16 lg:py-20">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center rounded-full border border-sage-200 bg-white px-4 py-1.5 text-sm font-medium text-sage-700 mb-4">
              <span className="flex h-2 w-2 rounded-full bg-peach-400 mr-2"></span>
              Personalized nutrition for every woman
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-sage-900 font-poppins">
              Nourish Your Body at <span className="gradient-text">Every Life Stage</span>
            </h1>
            
            <p className="text-lg md:text-xl text-sage-700 max-w-2xl mx-auto lg:mx-0">
              Discover personalized nutrition plans tailored to your unique needs as a woman. From adolescence to menopause and beyond, we're here to support your wellness journey.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4 justify-center lg:justify-start">
              <Button onClick={() => window.location.href = '/meal-plans'} size="lg" className="bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700 text-white font-medium px-6 py-6">
                Get Your Custom Plan
                <ChevronRight className="ml-1 h-5 w-5" />
              </Button>
            </div>
          
          </div>
          
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-lavender-100 rounded-full blur-3xl opacity-70"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-peach-100 rounded-full blur-3xl opacity-70"></div>
            
            <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-sage-100">
              <div className="absolute top-3 left-3 right-3 bg-sage-50 h-8 rounded-lg flex items-center px-3">
                <div className="w-2 h-2 rounded-full bg-peach-400 mr-1.5"></div>
                <div className="w-2 h-2 rounded-full bg-peach-300 mr-1.5"></div>
                <div className="w-2 h-2 rounded-full bg-sage-300 mr-1.5"></div>
              </div>
              
              <div className="pt-16 p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-xl font-medium text-sage-800">Today's AI-Generated Nutrition Tip</div>
                  <Button
                    onClick={generateNewTip}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-sage-600 hover:text-sage-700"
                    disabled={isGenerating}
                  >
                    <RotateCw className={`h-5 w-5 ${isGenerating ? 'animate-spin' : ''}`} />
                  </Button>
                </div>
                <div className="p-4 bg-sage-50 rounded-lg mb-6">
                  <p className="text-sage-700">
                    "{tip}"
                  </p>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
