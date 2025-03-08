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
import { Heart, BookOpen, ArrowRight } from "lucide-react";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Wellness = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const wellnessCategories = [
    {
      title: "Nutrition & Diet",
      description:
        "Nutrition tips for overall wellness, energy, and longevity.",
      image:
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&q=80",
      tips: [
        "Incorporate at least 5 servings of vegetables and fruits daily, focusing on a variety of colors for different nutrients.",
        "Stay hydrated with at least 8 glasses of water daily; consider adding lemon or cucumber for flavor and extra benefits.",
        "Focus on whole, unprocessed foods like whole grains, lean proteins, and healthy fats instead of processed options high in sugar and unhealthy fats.",
        "Include lean proteins like chicken, fish, beans, or tofu with each meal to support muscle health and satiety.",
        "Limit added sugars to under 25g per day; check labels carefully and avoid sugary drinks and processed snacks.",
        "Choose healthy fats such as avocados, nuts, seeds, and olive oil for heart health and hormone balance.",
        "Eat mindfully by paying attention to your body's hunger and fullness cues, rather than eating distractedly.",
        "Plan your meals ahead of time to avoid impulsive unhealthy choices.",
        "Consider working with a registered dietitian for personalized nutrition advice.",
        "Read food labels carefully to understand the nutritional content and ingredients of packaged foods.",
      ],
    },
    {
      title: "Stress Management",
      description:
        "Tools and techniques to manage stress through nutrition and lifestyle.",
      image:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
      tips: [
        "Practice deep breathing for 5 minutes daily; try box breathing or diaphragmatic breathing techniques.",
        "Incorporate magnesium-rich foods like spinach, nuts, seeds, and dark chocolate, as magnesium helps regulate stress hormones.",
        "Limit caffeine intake, especially in the afternoon and evening, to reduce anxiety and improve sleep.",
        "Try adaptogens like ashwagandha, rhodiola, or holy basil for stress relief; consult with a healthcare provider before starting any new supplements.",
        "Establish a consistent sleep routine by going to bed and waking up at the same time each day, even on weekends.",
        "Engage in regular physical activity, such as walking, running, or yoga, to release endorphins and reduce stress.",
        "Practice mindfulness meditation or yoga to calm the mind and body.",
        "Connect with loved ones and build strong social connections for emotional support.",
        "Spend time in nature to reduce stress and improve mood.",
        "Learn to say no to commitments that overwhelm you and prioritize self-care.",
      ],
    },
    {
      title: "Hormonal Health",
      description:
        "Understanding and supporting your hormonal health at every life stage.",
      image:
        "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=600&q=80",
      tips: [
        "Include healthy fats such as avocados, olive oil, and fatty fish for hormone production.",
        "Eat cruciferous vegetables like broccoli, cauliflower, and kale to support estrogen metabolism and detoxification.",
        "Maintain consistent meal timing to regulate blood sugar levels and prevent hormonal imbalances.",
        "Consider seed cycling by alternating between flax and pumpkin seeds (follicular phase) and sesame and sunflower seeds (luteal phase) for menstrual support.",
        "Prioritize quality sleep for hormone balance, as sleep deprivation can disrupt hormone production.",
        "Limit exposure to endocrine-disrupting chemicals found in plastics, pesticides, and some personal care products.",
        "Manage stress levels, as chronic stress can negatively impact hormone balance.",
        "Incorporate fiber-rich foods like fruits, vegetables, and whole grains to support healthy digestion and hormone detoxification.",
        "Consider working with a functional medicine doctor or endocrinologist for personalized hormone testing and treatment.",
        "Stay active and maintain a healthy weight, as excess body fat can disrupt hormone balance.",
      ],
    },
    {
      title: "Sleep Optimization",
      description:
        "Foods and habits that promote better, more restorative sleep.",
      image:
        "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=600&q=80",
      tips: [
        "Avoid caffeine after 2pm, as it can interfere with sleep even hours later.",
        "Try tart cherry juice or magnesium-rich foods before bed, as they contain compounds that promote relaxation and sleep.",
        "Establish a consistent sleep and wake schedule, even on weekends, to regulate your body's natural sleep-wake cycle.",
        "Create a dark, cool (around 65°F), and quiet sleeping environment for optimal sleep.",
        "Limit blue light exposure from screens (phones, tablets, computers) 1-2 hours before bedtime; use blue light filters or night mode.",
        "Practice a relaxing bedtime routine, such as taking a warm bath, reading a book, or listening to calming music.",
        "Avoid large meals or sugary snacks before bed.",
        "Ensure your bedroom is dark, quiet, and cool for optimal sleep.",
        "Consider using a white noise machine or earplugs to block out distractions.",
        "If you can't fall asleep after 20 minutes, get out of bed and do a relaxing activity until you feel sleepy, then return to bed.",
      ],
    },
  ];

  const featuredTips = [
    {
      title: "5 Foods That Naturally Boost Your Energy",
      excerpt:
        "Discover nutrient-dense foods that provide sustained energy throughout your day...",
      readTime: "5 min read",
    },
    {
      title: "Nutrition Strategies for Better Sleep",
      excerpt:
        "Learn which foods to eat (and which to avoid) for deeper, more restorative sleep...",
      readTime: "7 min read",
    },
    {
      title: "Supporting Gut Health at Every Age",
      excerpt:
        "Why gut health matters and how to nurture your microbiome through proper nutrition...",
      readTime: "6 min read",
    },
  ];

  const openDialog = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16 pb-20 bg-gradient-to-b from-sage-50 to-white">
        <div className="container-custom">
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              Wellness Tips
            </h1>
            <p className="text-lg text-sage-700 max-w-2xl mx-auto">
              Evidence-based wellness advice to help you feel your best, with
              nutrition at the core of holistic health.
            </p>
          </header>

          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-sage-800 mb-8 text-center">
              Wellness Categories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {wellnessCategories.map((category, index) => (
                <Card
                  key={index}
                  className="card-hover overflow-hidden border border-sage-100"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-sage-800">
                      {category.title}
                    </CardTitle>
                    <CardDescription className="text-sage-600">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700 group">
                          Explore Tips
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>{category.title} Tips</DialogTitle>
                          <DialogDescription>
                            Practical tips to improve your{" "}
                            {category.title.toLowerCase()}.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          <ul className="space-y-2">
                            {category.tips.map((tip, i) => (
                              <li key={i} className="flex items-start">
                                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-sage-100 text-sage-800 mr-2 text-sm font-medium">
                                  {i + 1}
                                </span>
                                <span className="text-sage-700">{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-sage-800 mb-8 text-center">
              Featured Wellness Tips
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredTips.map((tip, index) => (
                <Card key={index} className="card-hover border border-sage-100">
                  <CardHeader>
                    <CardTitle className="text-xl text-sage-800">
                      {tip.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sage-600 mb-4">
                      {tip.excerpt}
                    </CardDescription>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-sage-500">
                        {tip.readTime}
                      </span>
                      <Button
                        variant="ghost"
                        className="text-sage-600 hover:text-sage-800 p-0 h-auto font-medium hover:bg-transparent"
                      >
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
                <h2 className="text-2xl font-semibold text-sage-800 mb-3">
                  Weekly Wellness Newsletter
                </h2>
                <p className="text-sage-600">
                  Get evidence-based nutrition and wellness tips delivered to
                  your inbox.
                </p>
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
