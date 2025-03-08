
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Bot, User, ClipboardList } from "lucide-react";
import { toast } from "sonner";

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
}

const MealPlanChatbot = () => {
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
  });
  const [chatComplete, setChatComplete] = useState<boolean>(false);
  const [generatedPlan, setGeneratedPlan] = useState<any>(null);

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
      text: "Do you have any medical conditions we should consider when creating your meal plan? (Type 'none' if not applicable)",
      sender: "bot",
      isQuestion: true,
      fieldName: "medicalConditions",
    },
  ];

  const handleSendMessage = () => {
    if (!currentInput.trim()) return;

    // Add user message to chat
    const userMessage: Message = {
      text: currentInput,
      sender: "user",
    };
    setMessages((prev) => [...prev, userMessage]);

    // Get current question being answered
    const currentQuestion = messages.filter((m) => m.isQuestion).pop();
    if (currentQuestion && currentQuestion.fieldName) {
      // Update user data with the answer
      setUserData((prev) => ({
        ...prev,
        [currentQuestion.fieldName]: currentInput,
      }));
    }

    // Find the next question to ask
    const askedQuestions = messages.filter((m) => m.isQuestion).length;
    if (askedQuestions < questions.length) {
      // Add the next question
      setTimeout(() => {
        setMessages((prev) => [...prev, questions[askedQuestions - 1]]);
        setCurrentInput("");
      }, 500);
    } else {
      // All questions asked
      setTimeout(() => {
        const thanksMessage: Message = {
          text: "Thank you for providing all this information! I'm generating your personalized meal plan now...",
          sender: "bot",
        };
        setMessages((prev) => [...prev, thanksMessage]);
        setCurrentInput("");
        
        // Generate meal plan after a delay to simulate processing
        setTimeout(() => {
          generateMealPlan();
          setChatComplete(true);
        }, 2000);
      }, 500);
    }
  };

  const handleOptionSelect = (option: string) => {
    setCurrentInput(option);
    handleSendMessage();
  };

  const generateMealPlan = () => {
    // This is a placeholder for the actual meal plan generation logic
    // In a real app, this would likely be an API call to an AI service
    const samplePlan = {
      weekdays: [
        {
          day: "Monday",
          meals: [
            {
              type: "Breakfast",
              dish: "Overnight Oats with Berries",
              description: "Fiber-rich oats with antioxidant-packed berries",
              nutrients: "Protein: 15g, Carbs: 45g, Fats: 8g",
            },
            {
              type: "Lunch",
              dish: "Mediterranean Quinoa Bowl",
              description: "Protein-rich quinoa with vegetables and olive oil",
              nutrients: "Protein: 20g, Carbs: 55g, Fats: 15g",
            },
            {
              type: "Dinner",
              dish: "Baked Salmon with Roasted Vegetables",
              description: "Omega-3 rich salmon with fiber-packed vegetables",
              nutrients: "Protein: 30g, Carbs: 25g, Fats: 18g",
            },
            {
              type: "Snack",
              dish: "Greek Yogurt with Honey and Nuts",
              description: "Protein-rich yogurt with healthy fats from nuts",
              nutrients: "Protein: 12g, Carbs: 15g, Fats: 10g",
            },
          ],
        },
        {
          day: "Tuesday",
          meals: [
            {
              type: "Breakfast",
              dish: "Spinach and Feta Omelette",
              description: "Protein-packed eggs with iron-rich spinach",
              nutrients: "Protein: 22g, Carbs: 5g, Fats: 16g",
            },
            {
              type: "Lunch",
              dish: "Lentil Soup with Whole Grain Bread",
              description: "Fiber and protein-rich lentils with complex carbs",
              nutrients: "Protein: 18g, Carbs: 60g, Fats: 7g",
            },
            {
              type: "Dinner",
              dish: "Grilled Chicken with Sweet Potato",
              description: "Lean protein with vitamin-rich sweet potato",
              nutrients: "Protein: 35g, Carbs: 40g, Fats: 12g",
            },
            {
              type: "Snack",
              dish: "Apple with Almond Butter",
              description: "Fiber-rich fruit with healthy fat source",
              nutrients: "Protein: 5g, Carbs: 25g, Fats: 10g",
            },
          ],
        },
        // Simplified to 2 days for brevity - a real implementation would have all 7 days
      ],
      hydrationGoal: "2.5 liters of water daily",
      supplementRecommendations: userData.physiologicalCondition === "Pregnancy" 
        ? "Prenatal vitamins with Folic Acid, Iron, and DHA" 
        : "Vitamin D and Omega-3 fatty acids",
      notes: "This meal plan is customized based on your input. Adjust portion sizes as needed to meet your caloric needs.",
    };

    setGeneratedPlan(samplePlan);
    
    // Success toast
    toast.success("Your custom meal plan is ready!", {
      description: "We've created a 7-day plan tailored to your needs.",
    });
  };

  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto rounded-xl bg-white overflow-hidden border border-sage-100 shadow-sm">
      <div className="bg-gradient-to-r from-sage-500 to-sage-600 p-4 text-white">
        <h2 className="text-xl font-semibold flex items-center">
          <Bot className="mr-2 h-6 w-6" /> Nutrition Assistant
        </h2>
      </div>

      <div className="flex-grow p-4 bg-sage-50 h-96 overflow-y-auto flex flex-col space-y-4">
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
                  ? "bg-white text-sage-800 border border-sage-100"
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
                          className="px-2 py-1 bg-sage-100 text-sage-700 text-xs rounded-full hover:bg-sage-200 transition-colors"
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
        <div className="p-4 border-t border-sage-100 bg-white">
          <div className="flex space-x-2">
            <Input
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              placeholder="Type your answer here..."
              className="flex-grow"
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
        <div className="p-4 border-t border-sage-100 bg-white">
          <Button
            onClick={() => window.location.reload()}
            className="w-full bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700"
          >
            Start a New Plan
          </Button>
        </div>
      )}

      {generatedPlan && (
        <div className="p-6 border-t border-sage-200 bg-white">
          <h3 className="text-xl font-semibold text-sage-800 mb-4 flex items-center">
            <ClipboardList className="mr-2 h-5 w-5" /> Your 7-Day Meal Plan
          </h3>
          
          <div className="space-y-6">
            {generatedPlan.weekdays.map((day, index) => (
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
              <p className="text-sage-600">{generatedPlan.hydrationGoal}</p>
              
              <p className="font-medium text-sage-700 mt-3">Supplement Recommendations:</p>
              <p className="text-sage-600">{generatedPlan.supplementRecommendations}</p>
              
              <p className="font-medium text-sage-700 mt-3">Notes:</p>
              <p className="text-sage-600">{generatedPlan.notes}</p>
            </div>
            
            <Button className="w-full bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700">
              Download Meal Plan PDF
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPlanChatbot;
