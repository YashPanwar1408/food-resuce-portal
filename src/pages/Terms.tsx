
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 bg-white py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
            
            <div className="prose prose-lg">
              <p>Last Updated: May 13, 2025</p>
              
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing or using FoodRescue Connect ("the Service"), you agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use the Service.
              </p>
              
              <h2>2. Description of Service</h2>
              <p>
                FoodRescue Connect is a platform that connects restaurants and food businesses with excess food to 
                non-governmental organizations that can distribute it to people in need. The Service facilitates the 
                donation process, coordination, and tracking of food donations.
              </p>
              
              <h2>3. User Accounts</h2>
              <p>
                To use certain features of the Service, you must register for an account. You agree to provide accurate, 
                current, and complete information during the registration process and to update such information to keep 
                it accurate, current, and complete.
              </p>
              
              <h2>4. Food Safety and Compliance</h2>
              <p>
                Restaurants and food businesses are responsible for ensuring that all donated food meets applicable 
                food safety regulations and standards. NGOs are responsible for proper handling, transportation, and 
                distribution of donated food.
              </p>
              
              <h2>5. Liability</h2>
              <p>
                FoodRescue Connect acts solely as a platform to connect donors with recipients and does not assume 
                liability for food safety, quality, or any damages arising from the use of donated food.
              </p>
              
              <h2>6. Modifications to the Service</h2>
              <p>
                We reserve the right to modify or discontinue, temporarily or permanently, the Service with or without 
                notice. You agree that we shall not be liable to you or any third party for any modification, suspension, 
                or discontinuance of the Service.
              </p>
              
              <h2>7. Privacy</h2>
              <p>
                Your use of the Service is governed by our Privacy Policy, which is incorporated into these Terms by reference.
              </p>
              
              <h2>8. Governing Law</h2>
              <p>
                These Terms shall be governed by the laws of the jurisdiction in which the Service is operated, without 
                regard to its conflict of law provisions.
              </p>
              
              <h2>9. Contact Information</h2>
              <p>
                If you have any questions about these Terms, please contact us at support@foodrescueconnect.example.com.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;
