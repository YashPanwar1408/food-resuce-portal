
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const SuccessStories = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 bg-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl font-bold mb-8 text-center">Success Stories</h1>
          
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">Fresh Start Bakery & Sunrise Shelter</h2>
              <p className="text-gray-600 mb-6">
                Fresh Start Bakery was throwing away dozens of unsold bread loaves and pastries each day. Through 
                FoodRescue Connect, they connected with Sunrise Shelter, which now picks up these items three times 
                a week to serve to homeless individuals in the community.
              </p>
              <div className="flex items-center space-x-4">
                <div className="bg-gray-200 w-16 h-16 rounded-full flex items-center justify-center text-gray-400">
                  Photo
                </div>
                <div>
                  <p className="font-medium">Results:</p>
                  <ul className="list-disc ml-5 text-gray-600">
                    <li>Over 5,000 bread items rescued</li>
                    <li>Serving an average of 150 people per week</li>
                    <li>Reduced bakery waste by 40%</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">Green Plate Catering & Community Kitchen</h2>
              <p className="text-gray-600 mb-6">
                After a large corporate event was canceled at the last minute, Green Plate Catering had prepared food 
                for 200 people with nowhere to go. Through our platform, they connected with a local community kitchen 
                that was able to pick up the food within hours and distribute it to families in need.
              </p>
              <div className="flex items-center space-x-4">
                <div className="bg-gray-200 w-16 h-16 rounded-full flex items-center justify-center text-gray-400">
                  Photo
                </div>
                <div>
                  <p className="font-medium">Impact:</p>
                  <ul className="list-disc ml-5 text-gray-600">
                    <li>200 high-quality meals provided</li>
                    <li>Approximately 80kg of food rescued</li>
                    <li>Prevented 152kg of CO₂ emissions</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">Harbor Restaurant Group & Food For All</h2>
              <p className="text-gray-600 mb-6">
                Harbor Restaurant Group has established a regular donation schedule through FoodRescue Connect, 
                donating excess food from their five restaurants to the Food For All organization twice weekly. 
                This ongoing partnership has made a substantial impact in their community.
              </p>
              <div className="flex items-center space-x-4">
                <div className="bg-gray-200 w-16 h-16 rounded-full flex items-center justify-center text-gray-400">
                  Photo
                </div>
                <div>
                  <p className="font-medium">Ongoing Results:</p>
                  <ul className="list-disc ml-5 text-gray-600">
                    <li>Over 15,000 meals provided annually</li>
                    <li>Consistent source of quality food for the community</li>
                    <li>Significant tax benefits for the restaurant group</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4">Join These Success Stories</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Whether you're a restaurant with excess food or an organization that helps those in need,
              you can make a difference with FoodRescue Connect.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="/register?type=restaurant" className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors">
                Register as a Restaurant
              </a>
              <a href="/register?type=ngo" className="bg-secondary text-secondary-foreground px-6 py-3 rounded-md hover:bg-secondary/80 transition-colors">
                Register as an NGO
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SuccessStories;
