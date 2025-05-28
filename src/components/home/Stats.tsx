
import { Leaf, Users, Utensils, Thermometer } from 'lucide-react';

const Stats = () => {
  return (
    <div className="bg-primary py-16">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Our Impact So Far</h2>
          <p className="text-primary-foreground/90 text-lg max-w-2xl mx-auto">
            Together with our partners, we're creating meaningful change in communities nationwide.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
              <Utensils className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-4xl font-bold mb-2">120K+</h3>
            <p className="text-gray-600">Meals Rescued</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
              <Leaf className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-4xl font-bold mb-2">85K</h3>
            <p className="text-gray-600">CO₂ Emissions Prevented (kg)</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-4xl font-bold mb-2">450+</h3>
            <p className="text-gray-600">Partner Organizations</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
              <Thermometer className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-4xl font-bold mb-2">35K</h3>
            <p className="text-gray-600">Food Waste Reduced (kg)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
