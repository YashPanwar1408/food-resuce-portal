
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Store, Building2, Utensils, Truck, Clock, FileCheck } from 'lucide-react';

const HowItWorks = () => {
  return (
    <div className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">How FoodRescue Connect Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our platform makes it easy for restaurants to donate excess food and for NGOs to access it.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-white rounded-lg border p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-lg mb-4">
              <Store className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Restaurants List Excess Food</h3>
            <p className="text-gray-600 mb-4">
              Restaurants and food businesses easily list their excess food with details on quantity, type, and pickup window.
            </p>
            <div className="pt-4 border-t">
              <Link to="/register?type=restaurant" className="text-primary hover:text-primary/80 font-medium inline-flex items-center">
                Register as a Restaurant
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
          
          {/* Step 2 */}
          <div className="bg-white rounded-lg border p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-lg mb-4">
              <Building2 className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">NGOs Browse & Reserve Food</h3>
            <p className="text-gray-600 mb-4">
              NGOs browse available donations nearby, view food details, and reserve items that match their needs.
            </p>
            <div className="pt-4 border-t">
              <Link to="/register?type=ngo" className="text-primary hover:text-primary/80 font-medium inline-flex items-center">
                Register as an NGO
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
          
          {/* Step 3 */}
          <div className="bg-white rounded-lg border p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-lg mb-4">
              <Truck className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Food Pickup & Distribution</h3>
            <p className="text-gray-600 mb-4">
              NGOs pick up the food during the scheduled time window and distribute it to those in need in their community.
            </p>
            <div className="pt-4 border-t">
              <Link to="/success-stories" className="text-primary hover:text-primary/80 font-medium inline-flex items-center">
                View Success Stories
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center">
            <div className="flex-shrink-0 mr-4">
              <Utensils className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h4 className="font-medium">Food Safety Guaranteed</h4>
              <p className="text-sm text-gray-600">All donations follow strict food safety protocols</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="flex-shrink-0 mr-4">
              <Clock className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h4 className="font-medium">Quick & Easy Process</h4>
              <p className="text-sm text-gray-600">List or claim food in under 3 minutes</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="flex-shrink-0 mr-4">
              <FileCheck className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h4 className="font-medium">Impact Tracking</h4>
              <p className="text-sm text-gray-600">Monitor your contribution to reducing waste</p>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <Link to="/how-it-works">
            <Button variant="outline" size="lg">
              Learn More About Our Process
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
