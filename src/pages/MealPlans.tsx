import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  Utensils,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";
import MealPlanChatbot from "@/components/MealPlanChatbot";

const MealPlans = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  const mealPlanCategories = [
    {
      title: "Weekly Meal Plans",
      description:
        "Complete 7-day meal plans with shopping lists and prep instructions.",
      icon: <Calendar className="h-12 w-12 text-sage-500" />,
    },
    {
      title: "Quick & Easy",
      description:
        "30-minute or less recipes for busy women who want to eat healthy.",
      icon: <Clock className="h-12 w-12 text-sage-500" />,
    },
    {
      title: "Specialized Diets",
      description:
        "Meal plans for specific dietary needs: gluten-free, dairy-free, vegan, etc.",
      icon: <Utensils className="h-12 w-12 text-sage-500" />,
    },
  ];

  const featuredMealPlans = [
    {
      title: "Hormone-Balancing Meal Plan",
      description:
        "A 7-day plan designed to support hormone health with wholesome, nutrient-dense foods.",
      image:
        "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=600&q=80",
      tags: ["Hormone Health", "Anti-Inflammatory", "Gluten-Free"],
    },
    {
      title: "Energy-Boosting Plan for Busy Women",
      description:
        "Quick, nutritious meals to keep your energy levels stable throughout the day.",
      image:
        "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=600&q=80",
      tags: ["Quick Prep", "High Energy", "Meal Prep Friendly"],
    },
    {
      title: "Pregnancy Nutrition Plan",
      description:
        "Balanced meals rich in folate, iron, calcium, and other essential nutrients for pregnancy.",
      image:
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&q=80",
      tags: ["Pregnancy", "Nutrient-Dense", "Mom-to-Be"],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16 pb-20 bg-gradient-to-b from-sage-50 to-white">
        <div className="container-custom">
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              Meal Plans
            </h1>
            <p className="text-lg text-sage-700 max-w-2xl mx-auto">
              Delicious, nutritious meal plans tailored to your unique needs,
              preferences, and health goals.
            </p>
          </header>

          <section className="p-8 bg-sage-50 rounded-xl text-center mb-16">
            <h2 className="text-2xl font-semibold text-sage-800 mb-3">
              Create Your Custom Meal Plan
            </h2>
            <p className="text-sage-600 mb-6 max-w-2xl mx-auto">
              Chat with our AI assistant to get a personalized meal plan
              designed specifically for your body, preferences, and health
              goals.
            </p>
            <Button
              className="bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700"
              onClick={() => setShowChatbot(true)}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Start Chatting Now
            </Button>
          </section>

          {showChatbot && (
            <section className="mb-16">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-sage-800">
                  Create Your Custom Meal Plan
                </h2>
                <Button
                  variant="ghost"
                  className="text-sage-700"
                  onClick={() => setShowChatbot(false)}
                >
                  Cancel
                </Button>
              </div>
              <MealPlanChatbot />
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MealPlans;
