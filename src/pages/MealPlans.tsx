
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Utensils, ArrowRight } from "lucide-react";

const MealPlans = () => {
  const mealPlanCategories = [
    {
      title: "Weekly Meal Plans",
      description: "Complete 7-day meal plans with shopping lists and prep instructions.",
      icon: <Calendar className="h-12 w-12 text-sage-500" />
    },
    {
      title: "Quick & Easy",
      description: "30-minute or less recipes for busy women who want to eat healthy.",
      icon: <Clock className="h-12 w-12 text-sage-500" />
    },
    {
      title: "Specialized Diets",
      description: "Meal plans for specific dietary needs: gluten-free, dairy-free, vegan, etc.",
      icon: <Utensils className="h-12 w-12 text-sage-500" />
    }
  ];

  const featuredMealPlans = [
    {
      title: "Hormone-Balancing Meal Plan",
      description: "A 7-day plan designed to support hormone health with wholesome, nutrient-dense foods.",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=600&q=80",
      tags: ["Hormone Health", "Anti-Inflammatory", "Gluten-Free"]
    },
    {
      title: "Energy-Boosting Plan for Busy Women",
      description: "Quick, nutritious meals to keep your energy levels stable throughout the day.",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=600&q=80",
      tags: ["Quick Prep", "High Energy", "Meal Prep Friendly"]
    },
    {
      title: "Pregnancy Nutrition Plan",
      description: "Balanced meals rich in folate, iron, calcium, and other essential nutrients for pregnancy.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&q=80",
      tags: ["Pregnancy", "Nutrient-Dense", "Mom-to-Be"]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16 pb-20 bg-gradient-to-b from-sage-50 to-white">
        <div className="container-custom">
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Meal Plans</h1>
            <p className="text-lg text-sage-700 max-w-2xl mx-auto">
              Delicious, nutritious meal plans tailored to your unique needs, preferences, and health goals.
            </p>
          </header>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {mealPlanCategories.map((category, index) => (
              <Card key={index} className="text-center p-6 card-hover border border-sage-100">
                <div className="flex justify-center mb-4">
                  {category.icon}
                </div>
                <CardTitle className="text-xl text-sage-800 mb-2">{category.title}</CardTitle>
                <CardDescription className="text-sage-600 mb-4">{category.description}</CardDescription>
                <Button className="w-full bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700">
                  Explore Plans
                </Button>
              </Card>
            ))}
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-sage-800 mb-8 text-center">Featured Meal Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredMealPlans.map((plan, index) => (
                <Card key={index} className="card-hover overflow-hidden border border-sage-100">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={plan.image} 
                      alt={plan.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-sage-800">{plan.title}</CardTitle>
                    <CardDescription className="text-sage-600">{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {plan.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-2 py-1 bg-sage-100 text-sage-700 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Button className="w-full bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700 group">
                      View Plan
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="p-8 bg-sage-50 rounded-xl text-center">
            <h2 className="text-2xl font-semibold text-sage-800 mb-3">Create Your Custom Meal Plan</h2>
            <p className="text-sage-600 mb-6 max-w-2xl mx-auto">
              Get a personalized meal plan designed specifically for your body, preferences, and health goals.
            </p>
            <Button className="bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700">
              Start Your Custom Plan
            </Button>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MealPlans;
