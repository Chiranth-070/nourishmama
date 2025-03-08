
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, BookOpen, ArrowRight } from "lucide-react";

const Wellness = () => {
  const wellnessCategories = [
    { 
      title: "Nutrition & Diet",
      description: "Nutrition tips for overall wellness, energy, and longevity.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&q=80"
    },
    { 
      title: "Stress Management",
      description: "Tools and techniques to manage stress through nutrition and lifestyle.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80"
    },
    { 
      title: "Hormonal Health",
      description: "Understanding and supporting your hormonal health at every life stage.",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=600&q=80"
    },
    { 
      title: "Sleep Optimization",
      description: "Foods and habits that promote better, more restorative sleep.",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=600&q=80"
    }
  ];

  const featuredTips = [
    {
      title: "5 Foods That Naturally Boost Your Energy",
      excerpt: "Discover nutrient-dense foods that provide sustained energy throughout your day...",
      readTime: "5 min read"
    },
    {
      title: "Nutrition Strategies for Better Sleep",
      excerpt: "Learn which foods to eat (and which to avoid) for deeper, more restorative sleep...",
      readTime: "7 min read"
    },
    {
      title: "Supporting Gut Health at Every Age",
      excerpt: "Why gut health matters and how to nurture your microbiome through proper nutrition...",
      readTime: "6 min read"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16 pb-20 bg-gradient-to-b from-sage-50 to-white">
        <div className="container-custom">
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Wellness Tips</h1>
            <p className="text-lg text-sage-700 max-w-2xl mx-auto">
              Evidence-based wellness advice to help you feel your best, with nutrition at the core of holistic health.
            </p>
          </header>

          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-sage-800 mb-8 text-center">Wellness Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {wellnessCategories.map((category, index) => (
                <Card key={index} className="card-hover overflow-hidden border border-sage-100">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-sage-800">{category.title}</CardTitle>
                    <CardDescription className="text-sage-600">{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700 group">
                      Explore Tips
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-sage-800 mb-8 text-center">Featured Wellness Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredTips.map((tip, index) => (
                <Card key={index} className="card-hover border border-sage-100">
                  <CardHeader>
                    <CardTitle className="text-xl text-sage-800">{tip.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sage-600 mb-4">{tip.excerpt}</CardDescription>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-sage-500">{tip.readTime}</span>
                      <Button variant="ghost" className="text-sage-600 hover:text-sage-800 p-0 h-auto font-medium hover:bg-transparent">
                        Read More →
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="p-8 bg-sage-50 rounded-xl">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-6">
                <h2 className="text-2xl font-semibold text-sage-800 mb-3">Weekly Wellness Newsletter</h2>
                <p className="text-sage-600">Get evidence-based nutrition and wellness tips delivered to your inbox.</p>
              </div>
              <Button className="bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700">
                <Heart className="mr-2 h-5 w-5" />
                Subscribe Now
              </Button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Wellness;
