import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sprout, Baby, Heart, Leaf } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { useToast } from "@/components/ui/use-toast";
import { OpenAI } from "openai";

interface StageGuideResponse {
  sections: {
    title: string;
    content: string[];
  }[];
}

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const LifeStages = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [guideContent, setGuideContent] = useState<StageGuideResponse | null>(null);

  const stages = [
    {
      title: "Adolescence",
      ageRange: "10-19 years",
      description: "Growth-focused nutrition to support development",
      icon: <Sprout className="h-8 w-8 text-peach-500" />,
      color: "bg-peach-50 border-peach-200",
      buttonClass: "text-peach-700 hover:bg-peach-100",
      nutrients: ["Iron", "Calcium", "Protein", "Zinc"]
    },
    {
      title: "Pregnancy & Postpartum",
      ageRange: "Maternal nutrition",
      description: "Nourishing mother and baby",
      icon: <Baby className="h-8 w-8 text-lavender-500" />,
      color: "bg-lavender-50 border-lavender-200",
      buttonClass: "text-lavender-700 hover:bg-lavender-100",
      nutrients: ["Folate", "Iron", "Calcium", "DHA"]
    },
    {
      title: "Perimenopause & Menopause",
      ageRange: "40+ years",
      description: "Hormone-balancing nutrition",
      icon: <Heart className="h-8 w-8 text-peach-500" />,
      color: "bg-peach-50 border-peach-200",
      buttonClass: "text-peach-700 hover:bg-peach-100",
      nutrients: ["Calcium", "Vitamin D", "Magnesium", "Phytoestrogens"]
    },
    {
      title: "Senior Women",
      ageRange: "60+ years",
      description: "Anti-inflammatory and bone health nutrition",
      icon: <Leaf className="h-8 w-8 text-sage-500" />,
      color: "bg-sage-50 border-sage-200",
      buttonClass: "text-sage-700 hover:bg-sage-100",
      nutrients: ["Vitamin B12", "Vitamin D", "Protein", "Antioxidants"]
    }
  ];

  const fetchLifeStageGuide = async (stage: typeof stages[0]) => {
    try {
      setIsLoading(true);
      setSelectedStage(stage.title);
      
      const prompt = `As a nutrition expert, provide a detailed guide for ${stage.title} (${stage.ageRange}). 
Focus on these key nutrients: ${stage.nutrients.join(', ')}.
Consider:
- Specific nutritional needs for this life stage
- Meal planning and timing
- Lifestyle recommendations
- Supplements if necessary
- Foods to focus on and avoid

Provide the response in the following JSON structure:
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
            content: "You are a professional nutritionist specializing in women's health and nutrition across different life stages. Provide evidence-based, practical advice."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        model: "gpt-4o-mini",
        temperature: 0.7,
      });

      if (!completion.choices[0]?.message?.content) {
        throw new Error('No response received');
      }

      const response = JSON.parse(completion.choices[0].message.content) as StageGuideResponse;
      setGuideContent(response);
      setDialogOpen(true);
    } catch (error) {
      console.error('Error fetching life stage guide:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate nutrition guide. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="section-title">Generic Nutrition for Every Life Stage</h2>
            <p className="text-sage-600">
              Women's nutritional needs evolve throughout life. Discover tailored guidance, essential nutrients, and meal plans specific to your current life stage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stages.map((stage, index) => (
              <Card 
                key={index} 
                className={`${stage.color} border shadow-sm hover:shadow-md transition-shadow card-hover overflow-hidden`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    {stage.icon}
                    <span className="text-sm font-medium text-gray-500">{stage.ageRange}</span>
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-800 mt-2">{stage.title}</CardTitle>
                  <CardDescription className="text-gray-600">{stage.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-gray-700">Key Nutrients:</p>
                    <div className="flex flex-wrap gap-2">
                      {stage.nutrients.map((nutrient, i) => (
                        <span 
                          key={i} 
                          className="inline-block px-3 py-1 bg-white/70 rounded-full text-xs font-medium text-gray-700"
                        >
                          {nutrient}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="ghost" 
                    className={`w-full ${stage.buttonClass}`}
                    onClick={() => fetchLifeStageGuide(stage)}
                  >
                    View Nutrition Guide
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto p-16">
          <DialogHeader>
            <DialogTitle className="text-3xl font-semibold text-sage-800">
              General {selectedStage} - Nutrition Guide
            </DialogTitle>
            <DialogDescription className="text-sage-600">
              Personalized nutrition recommendations and guidelines for this life stage.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 space-y-6">
            {guideContent?.sections.map((section, index) => (
              <div key={index} className="space-y-3">
                <h3 className="text-2xl font-semibold text-sage-800">{section.title}</h3>
                <ul className="space-y-2">
                  {section.content.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start gap-2 text-sage-700">
                      <span className="text-sage-500 font-medium">•</span>
                      <p className="text-xl">{point}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-6 text-sm text-sage-500 italic">
            Note: These recommendations are generated using AI and should be used in conjunction with professional medical advice.
          </div>
        </DialogContent>
      </Dialog>

      <LoadingOverlay isLoading={isLoading} />
    </>
  );
};

export default LifeStages;
