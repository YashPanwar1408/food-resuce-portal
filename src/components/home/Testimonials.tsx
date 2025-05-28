
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote: "FoodRescue Connect has transformed how we handle excess food. Instead of throwing it away, we're now feeding our community while reducing waste. The platform is incredibly easy to use.",
    author: "Maria Rodriguez",
    role: "Restaurant Owner",
    company: "Fresh Bites Café",
    imgPlaceholder: "R"
  },
  {
    id: 2,
    quote: "As a community kitchen, we've been able to increase our meal service by 40% thanks to FoodRescue Connect. The quality and variety of food we receive has made a huge difference for those we serve.",
    author: "James Thompson",
    role: "Program Director",
    company: "Hope Community Kitchen",
    imgPlaceholder: "N"
  },
  {
    id: 3,
    quote: "The analytics dashboard has been invaluable for tracking our impact and reporting to our board. We can clearly see how much food we've rescued and the environmental benefits.",
    author: "Sarah Johnson",
    role: "Sustainability Manager",
    company: "Green Table Restaurants",
    imgPlaceholder: "R"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };
  
  return (
    <div className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">What Our Partners Say</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hear from the restaurants and NGOs who are making a difference with FoodRescue Connect.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="text-primary mb-6">
                <Quote size={48} />
              </div>
              
              <p className="text-lg md:text-xl text-gray-700 mb-8">
                "{testimonials[currentIndex].quote}"
              </p>
              
              <div className="flex items-center">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-semibold">
                    {testimonials[currentIndex].imgPlaceholder}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold">{testimonials[currentIndex].author}</h4>
                  <p className="text-gray-600">{testimonials[currentIndex].role}, {testimonials[currentIndex].company}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-8">
            <button 
              onClick={prevTestimonial}
              className="mr-4 p-2 rounded-full border border-gray-300 hover:bg-gray-100"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-primary' : 'bg-gray-300'}`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button 
              onClick={nextTestimonial}
              className="ml-4 p-2 rounded-full border border-gray-300 hover:bg-gray-100"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
