
import { Card, CardContent } from "@/components/ui/card";

const Testimonials = () => {
  const testimonials = [
    {
      quote: "The personalized meal plans have been a game-changer for my health. As someone going through menopause, I finally found nutrition guidance that actually addresses my specific needs.",
      name: "Jennifer L.",
      age: 52,
      lifeStage: "Menopause",
      imagePlaceholder: "JL",
      bgColor: "bg-sage-50"
    },
    {
      quote: "I've struggled with PCOS for years and tried countless diets. This platform finally gave me a nutrition plan that helps manage my symptoms while still enjoying delicious food.",
      name: "Samantha K.",
      age: 34,
      lifeStage: "Young Adult with PCOS",
      imagePlaceholder: "SK",
      bgColor: "bg-lavender-50"
    },
    {
      quote: "During my pregnancy, I was so confused about what to eat. The trimester-specific meal plans made everything so much easier, and I felt confident I was getting the right nutrients for my baby.",
      name: "Michelle T.",
      age: 29,
      lifeStage: "Pregnancy",
      imagePlaceholder: "MT",
      bgColor: "bg-peach-50"
    }
  ];

  return (
    <section className="py-16 bg-cream-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="section-title">What Our Community Says</h2>
          <p className="text-sage-600">
            Join thousands of women who have transformed their health with our personalized nutrition guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className={`border-0 shadow-md hover:shadow-lg transition-shadow ${testimonial.bgColor}`}
            >
              <CardContent className="p-6">
                <div className="mb-4">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.667 13.333H5.33366C5.33366 7.99999 7.99366 5.33333 13.3337 5.33333V9.33333C10.667 9.33333 10.667 11.1333 10.667 13.333ZM21.3337 13.333H16.0003C16.0003 7.99999 18.667 5.33333 24.0003 5.33333V9.33333C21.3337 9.33333 21.3337 11.1333 21.3337 13.333ZM24.0003 16V25.3333H5.33366V16H24.0003Z" fill="#4D8573"/>
                  </svg>
                </div>
                <p className="text-gray-700 mb-6 italic">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center text-sage-700 font-medium border border-sage-200">
                    {testimonial.imagePlaceholder}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-800">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.age}, {testimonial.lifeStage}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-xl p-6 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="inline-block h-10 w-10 rounded-full ring-2 ring-white bg-sage-100">
                    <span className="sr-only">User avatar</span>
                  </div>
                ))}
              </div>
              <div className="ml-4">
                <p className="font-semibold text-sage-900 text-lg">Join over 10,000 women</p>
                <p className="text-sage-600">on their journey to better nutrition</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sage-900 font-semibold">4.9 out of 5</span>
              <span className="text-sage-600">based on 2,400+ reviews</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
