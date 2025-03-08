
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import NutritionCalculator from "@/components/NutritionCalculator";
import LifeStages from "@/components/LifeStages";
import Features from "@/components/Features";
import CTA from "@/components/CTA";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <NutritionCalculator />
        <LifeStages />
        <Features />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
