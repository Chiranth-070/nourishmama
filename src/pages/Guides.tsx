
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight } from "lucide-react";

const Guides = () => {
  const nutritionGuides = [
    {
      title: "Adolescence (10-19 years)",
      description: "Growth-focused meals, iron and calcium-rich foods, easy-to-make recipes for teens.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
      alt: "Teen preparing a healthy meal"
    },
    {
      title: "Young Adulthood (20-35 years)",
      description: "Energy-boosting diet plans, skin and hair health foods, stress-reducing meal ideas.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&q=80",
      alt: "Young adult with healthy meal"
    },
    {
      title: "Pregnancy & Postpartum",
      description: "Pregnancy-safe foods, trimester-based meal guides, lactation-friendly diets for new mothers.",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=600&q=80",
      alt: "Pregnant woman preparing healthy food"
    },
    {
      title: "Perimenopause & Menopause",
      description: "Hormone-balancing meals, bone-strengthening diets, and weight management strategies.",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=600&q=80",
      alt: "Woman in menopause stage eating healthy"
    },
    {
      title: "Senior Women (60+)",
      description: "Anti-inflammatory diets, memory-boosting foods, and easy-to-digest meal plans.",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=600&q=80",
      alt: "Senior woman with healthy meal"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16 pb-20 bg-gradient-to-b from-sage-50 to-white">
        <div className="container-custom">
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Nutrition Guides</h1>
            <p className="text-lg text-sage-700 max-w-2xl mx-auto">
              Tailored nutrition guidance for women at every life stage, backed by science and designed for your unique needs.
            </p>
          </header>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {nutritionGuides.map((guide, index) => (
              <Card key={index} className="card-hover overflow-hidden border border-sage-100">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={guide.image} 
                    alt={guide.alt}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-sage-800">{guide.title}</CardTitle>
                  <CardDescription className="text-sage-600">{guide.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700 mt-2 group">
                    Read Guide
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </section>

          <section className="mt-16 p-8 bg-sage-50 rounded-xl">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-6">
                <h2 className="text-2xl font-semibold text-sage-800 mb-3">Need Personalized Nutrition Advice?</h2>
                <p className="text-sage-600">Our AI-powered nutrition tool can create a customized plan just for you.</p>
              </div>
              <Button className="bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700">
                <BookOpen className="mr-2 h-5 w-5" />
                Get Your Custom Plan
              </Button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Guides;
