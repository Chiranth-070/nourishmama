import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Bot, User, ClipboardList, FileDown } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

interface Message {
  text: string;
  sender: "bot" | "user";
  isQuestion?: boolean;
  options?: string[];
  fieldName?: string;
  inputType?: string;
}

interface UserData {
  age: string;
  physiologicalCondition: string;
  dietaryPreferences: string;
  healthGoals: string;
  weight: string;
  height: string;
  medicalConditions: string;
  healthDescription: string;
}

type MealPlanResponse = z.infer<typeof MealPlanResponseSchema>;
type MealPlanDay = z.infer<typeof DaySchema>;
type NutritionReport = z.infer<typeof NutritionReportSchema>;

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const MealSchema = z.object({
  type: z.string(),
  dish: z.string(),
  description: z.string(),
  nutrients: z.string(),
  ingredients: z.array(z.string()),
  instructions: z.array(z.string())
}).required();

const DaySchema = z.object({
  day: z.string(),
  meals: z.array(MealSchema)
}).required();

const WeekPlanSchema = z.object({
  overview: z.string(),
  hydrationGoal: z.string(),
  supplementRecommendations: z.string(),
  days: z.array(DaySchema)
}).required();

const RecommendationSchema = z.object({
  title: z.string(),
  points: z.array(z.string())
}).required();

const LifestyleSchema = z.object({
  title: z.string(),
  suggestions: z.array(z.string())
}).required();

const NutritionReportSchema = z.object({
  summary: z.string(),
  keyFindings: z.array(z.string()),
  recommendations: z.array(RecommendationSchema),
  lifestyle: z.array(LifestyleSchema)
}).required();

const MealPlanResponseSchema = z.object({
  weekPlan: WeekPlanSchema,
  report: NutritionReportSchema
}).required();

const MealPlanChatbot = () => {
  const chatContainerRef = React.useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! I'm your nutrition assistant. I'll help you create a personalized meal plan. Let's start with your age. How old are you?",
      sender: "bot",
      isQuestion: true,
      fieldName: "age",
      inputType: "number",
    },
  ]);
  const [currentInput, setCurrentInput] = useState<string>("");
  const [userData, setUserData] = useState<UserData>({
    age: "",
    physiologicalCondition: "",
    dietaryPreferences: "",
    healthGoals: "",
    weight: "",
    height: "",
    medicalConditions: "",
    healthDescription: "",
  });
  const [chatComplete, setChatComplete] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showReviewDialog, setShowReviewDialog] = useState<boolean>(false);
  const [mealPlanResponse, setMealPlanResponse] = useState<MealPlanResponse | null>(null);
  const [showReportDialog, setShowReportDialog] = useState<boolean>(false);

  // Auto scroll to bottom when messages change
  React.useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Questions flow
  const questions: Message[] = [
    {
      text: "Great! Now, what's your current physiological condition?",
      sender: "bot",
      isQuestion: true,
      fieldName: "physiologicalCondition",
      options: [
        "Regular Menstruation",
        "Pregnancy",
        "Postpartum",
        "Perimenopause",
        "Menopause",
        "Post-menopause",
        "Other",
      ],
    },
    {
      text: "Do you have any dietary preferences or restrictions?",
      sender: "bot",
      isQuestion: true,
      fieldName: "dietaryPreferences",
      options: [
        "No Restrictions",
        "Vegetarian",
        "Vegan",
        "Gluten-Free",
        "Dairy-Free",
        "Keto",
        "Paleo",
        "Other",
      ],
    },
    {
      text: "What are your main health goals?",
      sender: "bot",
      isQuestion: true,
      fieldName: "healthGoals",
      options: [
        "Weight Loss",
        "Weight Gain",
        "Maintenance",
        "Energy Boost",
        "Gut Health",
        "Hormone Balance",
        "Other",
      ],
    },
    {
      text: "What's your current weight in kg?",
      sender: "bot",
      isQuestion: true,
      fieldName: "weight",
      inputType: "number",
    },
    {
      text: "And your height in cm?",
      sender: "bot",
      isQuestion: true,
      fieldName: "height",
      inputType: "number",
    },
    {
      text: "Do you have any medical conditions we should consider?",
      sender: "bot",
      isQuestion: true,
      fieldName: "medicalConditions",
    },
    {
      text: "Please describe any specific health concerns, symptoms, or goals in your own words. This helps us create a more personalized plan.",
      sender: "bot",
      isQuestion: true,
      fieldName: "healthDescription",
    },
  ];

  const handleSendMessage = () => {
    if (!currentInput.trim()) return;

    const userMessage: Message = {
      text: currentInput,
      sender: "user",
    };
    setMessages((prev) => [...prev, userMessage]);

    const currentQuestion = messages.filter((m) => m.isQuestion).pop();
    if (currentQuestion && currentQuestion.fieldName) {
      setUserData((prev) => ({
        ...prev,
        [currentQuestion.fieldName]: currentInput,
      }));
    }

    const askedQuestions = messages.filter((m) => m.isQuestion).length;
    if (askedQuestions < questions.length) {
      setTimeout(() => {
        setMessages((prev) => [...prev, questions[askedQuestions - 1]]);
        setCurrentInput("");
      }, 500);
    } else {
      setTimeout(() => {
        const thanksMessage: Message = {
          text: "Thank you for providing all this information! Let's review your details before generating your personalized plan.",
          sender: "bot",
        };
        setMessages((prev) => [...prev, thanksMessage]);
        setCurrentInput("");
        setShowReviewDialog(true);
      }, 500);
    }
  };

  const handleOptionSelect = (option: string) => {
    setCurrentInput(option);
    // Automatically submit after selection
    setTimeout(() => handleSendMessage(), 100);
  };

  const generateMealPlan = async () => {
    try {
      setIsLoading(true);
      setShowReviewDialog(false);

      const prompt = `As a nutrition expert, create a comprehensive meal plan and nutrition report based on the following user information:
- Age: ${userData.age}
- Physiological Condition: ${userData.physiologicalCondition}
- Dietary Preferences: ${userData.dietaryPreferences}
- Health Goals: ${userData.healthGoals}
- Weight: ${userData.weight}kg
- Height: ${userData.height}cm
- Medical Conditions: ${userData.medicalConditions}
- Additional Health Information: ${userData.healthDescription}

Create a personalized weekly meal plan (Monday-Friday) with detailed meals, including descriptions, nutrients, ingredients, and instructions. Also provide a comprehensive nutrition report with key findings, recommendations, and lifestyle suggestions.`;

      const completion = await openai.beta.chat.completions.parse({
        messages: [
          {
            role: "system",
            content: "You are a professional nutritionist creating personalized meal plans and nutrition reports. Provide evidence-based, practical advice."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        model: "gpt-4o-mini",
        temperature: 0.7,
        response_format: zodResponseFormat(MealPlanResponseSchema, "mealPlan")
      });

      const response = completion.choices[0].message.parsed;
      setMealPlanResponse(response);
      setChatComplete(true);
      
      toast.success("Your personalized meal plan is ready!", {
        description: "View your weekly plan and detailed nutrition report.",
      });
    } catch (error) {
      console.error('Error generating meal plan:', error);
      toast.error("Failed to generate meal plan", {
        description: "Please try again or contact support if the issue persists.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      // For now, we'll create a simple text-based PDF
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(20);
      doc.text('Your Personalized Meal Plan', 20, 20);
      
      let yPos = 40;
      
      // Add overview
      doc.setFontSize(12);
      doc.text('Overview:', 20, yPos);
      yPos += 10;
      doc.setFontSize(10);
      const overviewLines = doc.splitTextToSize(mealPlanResponse?.weekPlan.overview || '', 170);
      doc.text(overviewLines, 20, yPos);
      yPos += overviewLines.length * 7;
      
      // Add each day's meals
      mealPlanResponse?.weekPlan.days.forEach((day) => {
        yPos += 10;
        doc.setFontSize(12);
        doc.text(day.day, 20, yPos);
        yPos += 7;
        
        day.meals.forEach((meal) => {
          if (yPos > 270) {
            doc.addPage();
            yPos = 20;
          }
          doc.setFontSize(10);
          doc.text(`${meal.type}: ${meal.dish}`, 25, yPos);
          yPos += 5;
          const descLines = doc.splitTextToSize(meal.description, 165);
          doc.text(descLines, 25, yPos);
          yPos += descLines.length * 5 + 5;
        });
      });
      
      doc.save('meal-plan.pdf');
      
      toast.success("Meal plan PDF downloaded successfully!");
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error("Failed to download PDF", {
        description: "Please try again or contact support if the issue persists.",
      });
    }
  };

  return (
    <div className="flex gap-6 w-full max-w-[1400px] mx-auto p-4 h-[calc(85vh-2rem)]">
      {/* Chatbot Section - Left Half */}
      <div className="flex flex-col w-1/2 rounded-xl bg-white overflow-hidden border border-sage-100 shadow-sm">
        <div className="bg-gradient-to-r from-sage-500 to-sage-600 p-4 text-white">
          <h2 className="text-xl font-semibold flex items-center">
            <Bot className="mr-2 h-6 w-6" /> Nutrition Assistant
          </h2>
        </div>

        <div 
          ref={chatContainerRef}
          className="flex-grow p-4 bg-sage-50 overflow-y-auto flex flex-col space-y-4 min-h-[500px]"
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === "bot" ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender === "bot"
                    ? "bg-white text-sage-800 shadow-sm"
                    : "bg-sage-600 text-white"
                }`}
              >
                <div className="flex items-start">
                  {message.sender === "bot" && (
                    <Bot className="mr-2 h-4 w-4 mt-1 flex-shrink-0" />
                  )}
                  <div>
                    <p>{message.text}</p>
                    {message.options && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {message.options.map((option, optIndex) => (
                          <button
                            key={optIndex}
                            onClick={() => handleOptionSelect(option)}
                            className="px-3 py-1.5 bg-sage-100 text-sage-700 rounded-full hover:bg-sage-200 transition-colors text-sm font-medium"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {message.sender === "user" && (
                    <User className="ml-2 h-4 w-4 mt-1 flex-shrink-0" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {!chatComplete ? (
          <div className="p-4 bg-white">
            <div className="flex space-x-2">
              <Input
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                placeholder="Type your answer here..."
                className="flex-grow focus:ring-0 border-sage-200 focus:border-sage-400"
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700"
              >
                Send <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-white">
            <Button
              onClick={() => window.location.reload()}
              className="w-full bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700"
            >
              Start a New Plan
            </Button>
          </div>
        )}
      </div>

      {/* Meal Plan Section - Right Half */}
      {mealPlanResponse && (
        <div className="w-1/2 bg-white rounded-xl border border-sage-100 shadow-sm overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-sage-100 p-4 z-10">
            <h3 className="text-xl font-semibold text-sage-800 flex items-center">
              <ClipboardList className="mr-2 h-5 w-5" /> Your Meal Plan
            </h3>
          </div>
          
          <div className="p-6 space-y-6">
            {mealPlanResponse.weekPlan.days.map((day, index) => (
              <div key={index} className="border border-sage-100 rounded-lg overflow-hidden">
                <div className="bg-sage-100 p-3">
                  <h4 className="font-medium text-sage-800">{day.day}</h4>
                </div>
                <div className="divide-y divide-sage-100">
                  {day.meals.map((meal, mealIndex) => (
                    <div key={mealIndex} className="p-3">
                      <p className="font-medium text-sage-700">{meal.type}: {meal.dish}</p>
                      <p className="text-sm text-sage-600">{meal.description}</p>
                      <p className="text-xs text-sage-500 mt-1">{meal.nutrients}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            <div className="bg-sage-50 p-4 rounded-lg">
              <p className="font-medium text-sage-700">Hydration Goal:</p>
              <p className="text-sage-600">{mealPlanResponse.weekPlan.hydrationGoal}</p>
              
              <p className="font-medium text-sage-700 mt-3">Supplement Recommendations:</p>
              <p className="text-sage-600">{mealPlanResponse.weekPlan.supplementRecommendations}</p>
              
              <p className="font-medium text-sage-700 mt-3">Notes:</p>
              <p className="text-sage-600">{mealPlanResponse.weekPlan.overview}</p>
            </div>
            
            <Button 
              onClick={handleDownloadPDF}
              className="w-full bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700"
            >
              <FileDown className="mr-2 h-4 w-4" />
              Download Meal Plan PDF
            </Button>
          </div>
        </div>
      )}

      <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Review Your Information</DialogTitle>
            <DialogDescription>
              Please review your information before we generate your personalized meal plan.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-sage-700">Age</h4>
                <p className="text-sage-600">{userData.age} years</p>
              </div>
              <div>
                <h4 className="font-medium text-sage-700">Physiological Condition</h4>
                <p className="text-sage-600">{userData.physiologicalCondition}</p>
              </div>
              <div>
                <h4 className="font-medium text-sage-700">Dietary Preferences</h4>
                <p className="text-sage-600">{userData.dietaryPreferences}</p>
              </div>
              <div>
                <h4 className="font-medium text-sage-700">Health Goals</h4>
                <p className="text-sage-600">{userData.healthGoals}</p>
              </div>
              <div>
                <h4 className="font-medium text-sage-700">Weight</h4>
                <p className="text-sage-600">{userData.weight} kg</p>
              </div>
              <div>
                <h4 className="font-medium text-sage-700">Height</h4>
                <p className="text-sage-600">{userData.height} cm</p>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-sage-700">Medical Conditions</h4>
              <p className="text-sage-600">{userData.medicalConditions}</p>
            </div>
            <div>
              <h4 className="font-medium text-sage-700">Additional Health Information</h4>
              <p className="text-sage-600">{userData.healthDescription}</p>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={generateMealPlan}
              className="w-full bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700"
            >
              Generate Meal Plan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Your Nutrition Report</DialogTitle>
            <DialogDescription>
              A comprehensive analysis of your nutritional needs and recommendations.
            </DialogDescription>
          </DialogHeader>
          {mealPlanResponse?.report && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-sage-800">Summary</h3>
                <p className="text-sage-600 mt-2">{mealPlanResponse.report.summary}</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-sage-800">Key Findings</h3>
                <ul className="mt-2 space-y-2">
                  {mealPlanResponse.report.keyFindings.map((finding, index) => (
                    <li key={index} className="flex items-start gap-2 text-sage-600">
                      <span className="text-sage-500">•</span>
                      <span>{finding}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {mealPlanResponse.report.recommendations.map((rec, index) => (
                <div key={index}>
                  <h3 className="text-xl font-semibold text-sage-800">{rec.title}</h3>
                  <ul className="mt-2 space-y-2">
                    {rec.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start gap-2 text-sage-600">
                        <span className="text-sage-500">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {mealPlanResponse.report.lifestyle.map((section, index) => (
                <div key={index}>
                  <h3 className="text-xl font-semibold text-sage-800">{section.title}</h3>
                  <ul className="mt-2 space-y-2">
                    {section.suggestions.map((suggestion, sugIndex) => (
                      <li key={sugIndex} className="flex items-start gap-2 text-sage-600">
                        <span className="text-sage-500">•</span>
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
          <DialogFooter>
            <Button
              onClick={() => {/* Add PDF download logic */}}
              className="bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700"
            >
              <FileDown className="mr-2 h-4 w-4" />
              Download Report PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <LoadingOverlay isLoading={isLoading} />
    </div>
  );
};

export default MealPlanChatbot;
