
import { Button } from "@/components/ui/button";
import { ChevronRight, Apple, Salad } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-sage-50 to-white py-12 md:py-16 lg:py-20">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center rounded-full border border-sage-200 bg-white px-4 py-1.5 text-sm font-medium text-sage-700 mb-4">
              <span className="flex h-2 w-2 rounded-full bg-peach-400 mr-2"></span>
              Personalized nutrition for every woman
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-sage-900 font-poppins">
              Nourish Your Body at <span className="gradient-text">Every Life Stage</span>
            </h1>
            
            <p className="text-lg md:text-xl text-sage-700 max-w-2xl mx-auto lg:mx-0">
              Discover personalized nutrition plans tailored to your unique needs as a woman. From adolescence to menopause and beyond, we're here to support your wellness journey.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4 justify-center lg:justify-start">
              <Button size="lg" className="bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700 text-white font-medium px-6 py-6">
                Get Your Custom Plan
                <ChevronRight className="ml-1 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="border-sage-200 text-sage-700 hover:bg-sage-50 px-6 py-6">
                Explore Nutrition Guides
              </Button>
            </div>
            
            <div className="pt-6">
              <p className="text-sm text-sage-600 mb-3">Trusted by thousands of women worldwide</p>
              <div className="flex items-center justify-center lg:justify-start space-x-8">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-sage-100">
                      <span className="sr-only">User avatar</span>
                    </div>
                  ))}
                </div>
                <div className="text-sm text-sage-700">
                  <span className="font-semibold">4.9/5</span> from over 2,000 reviews
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-lavender-100 rounded-full blur-3xl opacity-70"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-peach-100 rounded-full blur-3xl opacity-70"></div>
            
            <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-sage-100">
              <div className="absolute top-3 left-3 right-3 bg-sage-50 h-8 rounded-lg flex items-center px-3">
                <div className="w-2 h-2 rounded-full bg-peach-400 mr-1.5"></div>
                <div className="w-2 h-2 rounded-full bg-peach-300 mr-1.5"></div>
                <div className="w-2 h-2 rounded-full bg-sage-300 mr-1.5"></div>
              </div>
              
              <div className="pt-16 p-6">
                <div className="text-xl font-medium mb-4 text-sage-800">Today's AI-Generated Nutrition Tip</div>
                <div className="p-4 bg-sage-50 rounded-lg mb-6">
                  <p className="text-sage-700">
                    "Focus on eating a rainbow of fruits and vegetables daily to ensure you're getting a diverse range of nutrients essential for hormone balance and overall well-being."
                  </p>
                </div>
                
                <div className="border-t border-sage-100 pt-4">
                  <div className="text-lg font-medium mb-3 text-sage-800">Recommended for You</div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-cream-100 p-3 rounded-lg flex items-center">
                      <Apple className="h-5 w-5 text-peach-500 mr-2" />
                      <span className="text-sm">Iron-rich foods</span>
                    </div>
                    <div className="bg-lavender-100 p-3 rounded-lg flex items-center">
                      <Salad className="h-5 w-5 text-sage-500 mr-2" />
                      <span className="text-sm">Fiber boost</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
