
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Store, Building2 } from 'lucide-react';

const CTA = () => {
  return (
    <div className="bg-gradient-to-br from-primary/90 to-primary py-16">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Join Our Mission To Reduce Food Waste</h2>
          <p className="text-xl mb-8 text-white/90">
            Whether you're a restaurant with excess food or an organization that helps those in need,
            FoodRescue Connect can help you make a difference.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto">
            <Link to="/register?type=restaurant">
              <Button size="lg" variant="secondary" className="w-full group">
                <Store className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                I'm a Restaurant
              </Button>
            </Link>
            <Link to="/register?type=ngo">
              <Button size="lg" variant="secondary" className="w-full group">
                <Building2 className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                I'm an NGO
              </Button>
            </Link>
          </div>
          
          <p className="mt-6 text-white/80">
            Already a member? <Link to="/login" className="underline hover:text-white">Sign in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CTA;
