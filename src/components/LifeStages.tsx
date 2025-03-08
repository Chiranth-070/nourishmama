
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sprout, Baby, Heart, Leaf, Apple } from "lucide-react";

const LifeStages = () => {
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

  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="section-title">Nutrition for Every Life Stage</h2>
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
                <Button variant="ghost" className={`w-full ${stage.buttonClass}`}>
                  View Nutrition Guide
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LifeStages;
