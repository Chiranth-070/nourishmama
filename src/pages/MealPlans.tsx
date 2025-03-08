import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Utensils, ArrowRight, MessageCircle, User, ClipboardList } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const MealPlans = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    weight: "",
    height: "",
    dietaryPreferences: "",
    healthGoals: "",
  });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    toast.success("Your custom meal plan request has been submitted!", {
      description: "We'll create your personalized plan shortly.",
    });
    setShowForm(false);
    setFormData({
      name: "",
      age: "",
      weight: "",
      height: "",
      dietaryPreferences: "",
      healthGoals: "",
    });
  };

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

          {showForm ? (
            <section className="mb-16 p-8 bg-sage-50 rounded-xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-sage-800">Create Your Custom Meal Plan</h2>
                <Button 
                  variant="ghost" 
                  className="text-sage-700" 
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleInputChange} 
                      placeholder="Enter your name" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input 
                      id="age" 
                      name="age" 
                      type="number" 
                      value={formData.age} 
                      onChange={handleInputChange} 
                      placeholder="Enter your age" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input 
                      id="weight" 
                      name="weight" 
                      type="number" 
                      value={formData.weight} 
                      onChange={handleInputChange} 
                      placeholder="Enter your weight" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input 
                      id="height" 
                      name="height" 
                      type="number" 
                      value={formData.height} 
                      onChange={handleInputChange} 
                      placeholder="Enter your height" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dietaryPreferences">Dietary Preferences</Label>
                    <Select 
                      onValueChange={(value) => handleSelectChange("dietaryPreferences", value)}
                      value={formData.dietaryPreferences}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select dietary preferences" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no-restrictions">No Restrictions</SelectItem>
                        <SelectItem value="vegetarian">Vegetarian</SelectItem>
                        <SelectItem value="vegan">Vegan</SelectItem>
                        <SelectItem value="gluten-free">Gluten-Free</SelectItem>
                        <SelectItem value="dairy-free">Dairy-Free</SelectItem>
                        <SelectItem value="keto">Keto</SelectItem>
                        <SelectItem value="paleo">Paleo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="healthGoals">Health Goals</Label>
                    <Select 
                      onValueChange={(value) => handleSelectChange("healthGoals", value)}
                      value={formData.healthGoals}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select health goals" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weight-loss">Weight Loss</SelectItem>
                        <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                        <SelectItem value="maintenance">Weight Maintenance</SelectItem>
                        <SelectItem value="energy-boost">Energy Boost</SelectItem>
                        <SelectItem value="gut-health">Gut Health</SelectItem>
                        <SelectItem value="hormone-balance">Hormone Balance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full md:w-auto bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700"
                >
                  <ClipboardList className="mr-2 h-5 w-5" />
                  Generate My Meal Plan
                </Button>
              </form>
            </section>
          ) : (
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
          )}

          <section className="p-8 bg-sage-50 rounded-xl text-center">
            <h2 className="text-2xl font-semibold text-sage-800 mb-3">Create Your Custom Meal Plan</h2>
            <p className="text-sage-600 mb-6 max-w-2xl mx-auto">
              Get a personalized meal plan designed specifically for your body, preferences, and health goals.
            </p>
            <Button 
              className="bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700"
              onClick={() => setShowForm(true)}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
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
