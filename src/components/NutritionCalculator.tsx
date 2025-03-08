import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ActivitySquare, Scale, Pocket } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

const NutritionCalculator = () => {
  const [activeTab, setActiveTab] = useState("bmi");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("female");
  const [activityLevel, setActivityLevel] = useState("moderate");
  const [result, setResult] = useState<number | null>(null);
  const [calories, setCalories] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<{
    title: string;
    description: string;
    tips: string[];
  }>({
    title: "",
    description: "",
    tips: [],
  });

  const resetForm = () => {
    setHeight("");
    setWeight("");
    setAge("");
    setGender("female");
    setActivityLevel("moderate");
    setResult(null);
    setCalories(null);
  };

  const calculateBMI = () => {
    if (!height || !weight) return;
    
    const heightInMeters = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);
    
    if (isNaN(heightInMeters) || isNaN(weightInKg) || heightInMeters <= 0 || weightInKg <= 0) {
      return;
    }
    
    const bmi = weightInKg / (heightInMeters * heightInMeters);
    const roundedBMI = parseFloat(bmi.toFixed(1));
    setResult(roundedBMI);

    // Prepare dialog content based on BMI
    const category = getBMICategory(roundedBMI);
    let tips: string[] = [];

    if (roundedBMI < 18.5) {
      tips = [
        "Consider increasing your caloric intake with nutrient-dense foods",
        "Include healthy fats like avocados, nuts, and olive oil in your diet",
        "Add protein-rich foods to help build muscle mass",
        "Consult with a healthcare provider about a safe weight gain plan",
        "Consider strength training to build muscle mass"
      ];
    } else if (roundedBMI < 25) {
      tips = [
        "Maintain a balanced diet with plenty of fruits and vegetables",
        "Stay physically active with regular exercise",
        "Get adequate sleep (7-9 hours per night)",
        "Stay hydrated by drinking plenty of water",
        "Continue regular health check-ups"
      ];
    } else if (roundedBMI < 30) {
      tips = [
        "Focus on portion control and mindful eating",
        "Increase physical activity to at least 150 minutes per week",
        "Choose whole grains over refined carbohydrates",
        "Include more fiber-rich foods in your diet",
        "Consider working with a nutritionist for personalized advice"
      ];
    } else {
      tips = [
        "Consult with healthcare providers for a personalized weight management plan",
        "Start with gentle exercises like walking or swimming",
        "Focus on gradual, sustainable lifestyle changes",
        "Monitor portion sizes and keep a food diary",
        "Consider joining a support group or working with a health coach"
      ];
    }

    setDialogContent({
      title: `BMI Result: ${roundedBMI} - ${category.category}`,
      description: "Your Body Mass Index (BMI) calculation results and personalized recommendations:",
      tips
    });
    setDialogOpen(true);
  };

  const calculateCalories = () => {
    if (!height || !weight || !age) return;
    
    const heightInCm = parseFloat(height);
    const weightInKg = parseFloat(weight);
    const ageInYears = parseFloat(age);
    
    if (
      isNaN(heightInCm) || 
      isNaN(weightInKg) || 
      isNaN(ageInYears) || 
      heightInCm <= 0 || 
      weightInKg <= 0 || 
      ageInYears <= 0
    ) {
      return;
    }
    
    // Harris-Benedict Formula for BMR
    let bmr;
    if (gender === "female") {
      bmr = 655.1 + (9.563 * weightInKg) + (1.850 * heightInCm) - (4.676 * ageInYears);
    } else {
      bmr = 66.47 + (13.75 * weightInKg) + (5.003 * heightInCm) - (6.755 * ageInYears);
    }
    
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9,
    };
    
    // @ts-ignore
    const tdee = bmr * activityMultipliers[activityLevel];
    const roundedCalories = Math.round(tdee);
    setCalories(roundedCalories);

    // Prepare tips based on activity level and calculated calories
    const tips = [
      `Your Basal Metabolic Rate (BMR) is approximately ${Math.round(bmr)} calories`,
      `For weight maintenance, aim for ${roundedCalories} calories daily`,
      `For weight loss, consider a deficit of 300-500 calories (${roundedCalories - 500} to ${roundedCalories - 300} calories)`,
      `For weight gain, consider a surplus of 300-500 calories (${roundedCalories + 300} to ${roundedCalories + 500} calories)`,
    ];

    // Add activity-specific tips
    switch(activityLevel) {
      case "sedentary":
        tips.push("Consider increasing your daily movement, even with simple activities like walking");
        tips.push("Take regular breaks from sitting to improve metabolism");
        break;
      case "light":
        tips.push("Try to incorporate more structured exercise into your routine");
        tips.push("Focus on consistency rather than intensity when starting out");
        break;
      case "moderate":
        tips.push("Keep up the good work with regular exercise");
        tips.push("Consider mixing up your routine to prevent plateaus");
        break;
      case "active":
        tips.push("Ensure adequate protein intake for muscle recovery");
        tips.push("Pay attention to pre and post-workout nutrition");
        break;
      case "veryActive":
        tips.push("Focus on recovery and adequate rest between intense workouts");
        tips.push("Consider working with a sports nutritionist for optimal performance");
        break;
    }

    setDialogContent({
      title: `Daily Calorie Needs: ${roundedCalories} calories`,
      description: "Your Total Daily Energy Expenditure (TDEE) calculation results and recommendations:",
      tips
    });
    setDialogOpen(true);
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: "Underweight", color: "text-blue-500" };
    if (bmi < 25) return { category: "Normal weight", color: "text-green-500" };
    if (bmi < 30) return { category: "Overweight", color: "text-yellow-500" };
    return { category: "Obesity", color: "text-red-500" };
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setResult(null);
    setCalories(null);
    resetForm();
  };

  return (
    <>
      <section className="py-16 bg-sage-50/50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="section-title">Nutrition & Health Calculator</h2>
              <p className="text-sage-600 max-w-2xl mx-auto">
                Use our calculator to get insights about your body's needs. These estimates can help guide your nutrition plan.
              </p>
            </div>

            <Card className="border-sage-100 shadow-md">
              <CardHeader>
                <CardTitle className="text-sage-800 text-center">Health Metrics Calculator</CardTitle>
                <CardDescription className="text-center">
                  Calculate your BMI or daily caloric needs based on your physical characteristics and activity level.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="bmi" className="flex items-center">
                      <Scale className="mr-2 h-4 w-4" />
                      BMI Calculator
                    </TabsTrigger>
                    <TabsTrigger value="calories" className="flex items-center">
                      <Pocket className="mr-2 h-4 w-4" />
                      Calorie Needs
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="bmi" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="height">Height (cm)</Label>
                        <Input
                          id="height"
                          type="number"
                          placeholder="e.g., 165"
                          value={height}
                          onChange={(e) => setHeight(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="weight">Weight (kg)</Label>
                        <Input
                          id="weight"
                          type="number"
                          placeholder="e.g., 65"
                          value={weight}
                          onChange={(e) => setWeight(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <Button 
                      onClick={calculateBMI} 
                      className="w-full bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700"
                    >
                      Calculate BMI
                    </Button>
                  </TabsContent>
                  
                  <TabsContent value="calories" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="height-cal">Height (cm)</Label>
                        <Input
                          id="height-cal"
                          type="number"
                          placeholder="e.g., 165"
                          value={height}
                          onChange={(e) => setHeight(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="weight-cal">Weight (kg)</Label>
                        <Input
                          id="weight-cal"
                          type="number"
                          placeholder="e.g., 65"
                          value={weight}
                          onChange={(e) => setWeight(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="age">Age (years)</Label>
                        <Input
                          id="age"
                          type="number"
                          placeholder="e.g., 30"
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gender">Gender (for calculation)</Label>
                        <Select value={gender} onValueChange={setGender}>
                          <SelectTrigger id="gender">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="male">Male</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="activity">Activity Level</Label>
                      <Select value={activityLevel} onValueChange={setActivityLevel}>
                        <SelectTrigger id="activity" className="flex items-center">
                          <ActivitySquare className="mr-2 h-4 w-4" />
                          <SelectValue placeholder="Select activity level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                          <SelectItem value="light">Lightly active (light exercise 1-3 days/week)</SelectItem>
                          <SelectItem value="moderate">Moderately active (moderate exercise 3-5 days/week)</SelectItem>
                          <SelectItem value="active">Very active (hard exercise 6-7 days/week)</SelectItem>
                          <SelectItem value="veryActive">Extra active (very hard exercise & physical job)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button 
                      onClick={calculateCalories} 
                      className="w-full bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700"
                    >
                      Calculate Daily Calories
                    </Button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Dialog open={dialogOpen} onOpenChange={(open) => {
        setDialogOpen(open);
        if (!open) resetForm();
      }}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-sage-800">
              {dialogContent.title}
            </DialogTitle>
            <DialogDescription className="text-sage-600">
              {dialogContent.description}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            {dialogContent.tips.map((tip, index) => (
              <div key={index} className="flex items-start gap-2 text-sage-700">
                <span className="text-sage-500 font-medium">•</span>
                <p>{tip}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-sm text-sage-500 italic">
            Note: These calculations are estimates and should not replace professional medical advice.
          </div>
          <DialogClose asChild>
            <Button className="mt-4 w-full bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700">
              Close and Reset
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NutritionCalculator;
