import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Store, Smartphone, Truck, Building2, ArrowRight } from 'lucide-react';

const HowItWorks = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 bg-gray-50 py-16">
        <div className="container-custom">
          <h1 className="text-4xl font-bold mb-12 text-center">How FoodRescue Connect Works</h1>

          {/* Straight Line Flow Section */}
          <div className="flex items-center justify-between space-x-12">
            {/* Step 1: Restaurant */}
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-6 rounded-full hover:bg-primary/20 transition">
                <Store className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mt-4">Restaurant Lists Food</h3>
              <p className="text-gray-600 mt-2 max-w-xs">
                Restaurants can list their excess food on the platform with details like quantity and pickup time.
              </p>
            </div>

            {/* Arrow */}
            <ArrowRight className="h-8 w-8 text-gray-400" />

            {/* Step 2: App */}
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-6 rounded-full hover:bg-primary/20 transition">
                <Smartphone className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mt-4">Connect via App</h3>
              <p className="text-gray-600 mt-2 max-w-xs">
                Our app connects restaurants, delivery personnel, and NGOs for seamless coordination.
              </p>
            </div>

            {/* Arrow */}
            <ArrowRight className="h-8 w-8 text-gray-400" />

            {/* Step 3: Delivery */}
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-6 rounded-full hover:bg-primary/20 transition">
                <Truck className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mt-4">Food Pickup</h3>
              <p className="text-gray-600 mt-2 max-w-xs">
                Delivery personnel pick up the food from restaurants and ensure safe transportation.
              </p>
            </div>

            {/* Arrow */}
            <ArrowRight className="h-8 w-8 text-gray-400" />

            {/* Step 4: NGO */}
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-6 rounded-full hover:bg-primary/20 transition">
                <Building2 className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mt-4">NGO Distributes Food</h3>
              <p className="text-gray-600 mt-2 max-w-xs">
                NGOs distribute the food to those in need, ensuring it reaches the right people.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HowItWorks;