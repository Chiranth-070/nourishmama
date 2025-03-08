
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

const NutritionCalculator = () => {
  const [activeTab, setActiveTab] = useState("bmi");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("female");
  const [activityLevel, setActivityLevel] = useState("moderate");
  const [result, setResult] = useState<number | null>(null);
  const [calories, setCalories] = useState<number | null>(null);

  const calculateBMI = () => {
    if (!height || !weight) return;
    
    const heightInMeters = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);
    
    if (isNaN(heightInMeters) || isNaN(weightInKg) || heightInMeters <= 0 || weightInKg <= 0) {
      return;
    }
    
    const bmi = weightInKg / (heightInMeters * heightInMeters);
    setResult(parseFloat(bmi.toFixed(1)));
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
    
    // Harris-Benedict Formula for BMR (Basal Metabolic Rate)
    let bmr;
    if (gender === "female") {
      bmr = 655.1 + (9.563 * weightInKg) + (1.850 * heightInCm) - (4.676 * ageInYears);
    } else {
      bmr = 66.47 + (13.75 * weightInKg) + (5.003 * heightInCm) - (6.755 * ageInYears);
    }
    
    // Activity multipliers
    const activityMultipliers = {
      sedentary: 1.2, // Little to no exercise
      light: 1.375, // Light exercise 1-3 days/week
      moderate: 1.55, // Moderate exercise 3-5 days/week
      active: 1.725, // Heavy exercise 6-7 days/week
      veryActive: 1.9, // Very heavy exercise, physical job or training twice a day
    };
    
    // @ts-ignore
    const tdee = bmr * activityMultipliers[activityLevel];
    setCalories(Math.round(tdee));
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
  };

  return (
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

                  {result !== null && (
                    <div className="mt-6 p-4 bg-white rounded-lg border border-sage-100 text-center">
                      <div className="text-3xl font-bold text-sage-800 mb-2">{result}</div>
                      <div className={`font-medium ${getBMICategory(result).color}`}>
                        {getBMICategory(result).category}
                      </div>
                      <p className="mt-2 text-sm text-sage-600">
                        BMI is just one indicator of health and doesn't account for factors like muscle mass, body composition, or specific health conditions.
                      </p>
                    </div>
                  )}
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

                  {calories !== null && (
                    <div className="mt-6 p-4 bg-white rounded-lg border border-sage-100 text-center">
                      <div className="text-3xl font-bold text-sage-800 mb-2">{calories}</div>
                      <div className="font-medium text-sage-700">Estimated daily calories</div>
                      <p className="mt-2 text-sm text-sage-600">
                        This is an estimate of the calories you need to maintain your current weight. For weight loss, reduce by 300-500 calories, and for weight gain, add 300-500 calories.
                      </p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default NutritionCalculator;
