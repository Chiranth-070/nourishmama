
import { Badge } from "@/components/ui/badge";
import { BookOpen, Brain, Calendar, BellPlus, Utensils, UserRound } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <UserRound className="h-8 w-8 text-sage-600" />,
      title: "Personalized Nutrition Plans",
      description: "Get a customized meal plan based on your age, health goals, and dietary preferences.",
      badge: "AI-Powered",
      color: "bg-sage-50"
    },
    {
      icon: <Calendar className="h-8 w-8 text-peach-600" />,
      title: "Weekly Meal Planners",
      description: "Dynamic meal schedules that adjust based on your progress and nutritional needs.",
      badge: "Interactive",
      color: "bg-peach-50"
    },
    {
      icon: <Utensils className="h-8 w-8 text-lavender-600" />,
      title: "Recipe Database",
      description: "Access hundreds of nutritionist-approved recipes with detailed nutritional information.",
      badge: "Extensive",
      color: "bg-lavender-50"
    },
    {
      icon: <BookOpen className="h-8 w-8 text-sage-600" />,
      title: "Life Stage Guides",
      description: "Science-backed nutrition advice for each stage of a woman's life.",
      badge: "Expert-Reviewed",
      color: "bg-sage-50"
    },
    {
      icon: <Brain className="h-8 w-8 text-peach-600" />,
      title: "Nutrient Deficiency Analysis",
      description: "Identify potential nutrient gaps based on your symptoms and dietary habits.",
      badge: "Smart Detection",
      color: "bg-peach-50"
    },
    {
      icon: <BellPlus className="h-8 w-8 text-lavender-600" />,
      title: "Health Reminders",
      description: "Personalized reminders for supplements, hydration, and balanced eating.",
      badge: "Daily Support",
      color: "bg-lavender-50"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="section-title">Features Designed for Your Wellness</h2>
          <p className="text-sage-600">
            Our platform offers tools and resources specifically designed to support women's nutritional needs at every stage of life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`${feature.color} rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <div className="flex items-center space-x-2 mb-3">
                <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
                <Badge variant="outline" className="bg-white/50 text-xs font-medium text-gray-600">
                  {feature.badge}
                </Badge>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
