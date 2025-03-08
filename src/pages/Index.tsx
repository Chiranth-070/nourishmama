
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import NutritionCalculator from "@/components/NutritionCalculator";
import LifeStages from "@/components/LifeStages";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <NutritionCalculator />
        <LifeStages />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
