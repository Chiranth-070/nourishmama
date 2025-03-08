
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-sage-100 to-lavender-50">
      <div className="container-custom">
        <Card className="border-0 shadow-lg bg-white overflow-hidden">
          <div className="relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-sage-400 via-peach-400 to-lavender-400"></div>
            <CardContent className="p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-sage-900 mb-4">Begin Your Personalized Nutrition Journey Today</h2>
                  <p className="text-sage-700 mb-6">
                    Get a customized meal plan tailored to your life stage, health goals, and dietary preferences. Our AI-powered platform creates a nutrition strategy uniquely designed for you.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-sage-100 border-2 border-sage-500 mt-1"></div>
                      <p className="ml-3 text-sage-800">Personalized meal plans based on your unique needs</p>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-peach-100 border-2 border-peach-500 mt-1"></div>
                      <p className="ml-3 text-sage-800">Science-backed nutrition advice for your life stage</p>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-lavender-100 border-2 border-lavender-500 mt-1"></div>
                      <p className="ml-3 text-sage-800">Weekly updates and adjustments to optimize results</p>
                    </div>
                  </div>
                  <div className="mt-8">
                    <Button size="lg" className="bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700 text-white font-medium px-6">
                      Start Your Free Assessment
                      <ChevronRight className="ml-1 h-5 w-5" />
                    </Button>
                    <p className="mt-3 text-sm text-sage-600">
                      No credit card required. Get your free personalized overview.
                    </p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-sage-50 to-lavender-50 p-6 rounded-xl">
                  <div className="bg-white rounded-lg shadow-sm p-5 border border-sage-100">
                    <h3 className="text-lg font-semibold mb-4 text-sage-800">Your Personalized Plan Includes:</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-sage-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Weekly meal plans with recipes</span>
                      </li>
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-sage-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Grocery shopping lists</span>
                      </li>
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-sage-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Nutrient tracking & analysis</span>
                      </li>
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-sage-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Life stage-specific guidance</span>
                      </li>
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-sage-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Recipe modification options</span>
                      </li>
                    </ul>
                    <div className="mt-6 pt-6 border-t border-sage-100">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Monthly Plan</span>
                        <span className="text-sage-900 font-semibold">$19.99/month</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Annual Plan</span>
                        <div>
                          <span className="line-through text-sage-600 text-sm">$239.88</span>
                          <span className="text-sage-900 font-semibold ml-2">$179.99/year</span>
                        </div>
                      </div>
                      <div className="mt-3">
                        <span className="inline-block bg-peach-100 text-peach-800 text-xs font-semibold px-3 py-1 rounded-full">
                          Save 25% with annual plan
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default CTA;
