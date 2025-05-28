
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 bg-white py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
            
            <div className="prose prose-lg">
              <p>Last Updated: May 13, 2025</p>
              
              <h2>1. Introduction</h2>
              <p>
                FoodRescue Connect ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy 
                explains how we collect, use, disclose, and safeguard your information when you use our platform.
              </p>
              
              <h2>2. Information We Collect</h2>
              <p>We may collect the following types of information:</p>
              <ul>
                <li>
                  <strong>Account Information:</strong> When you register, we collect your name, email address, 
                  organization name, and user type (restaurant or NGO).
                </li>
                <li>
                  <strong>Profile Information:</strong> Additional information you provide in your profile, such as 
                  location, contact details, and organization information.
                </li>
                <li>
                  <strong>Donation Information:</strong> Details about food donations, including types, quantities, 
                  pickup times, and locations.
                </li>
                <li>
                  <strong>Usage Data:</strong> Information about how you interact with our platform, including access 
                  times, pages viewed, and features used.
                </li>
              </ul>
              
              <h2>3. How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul>
                <li>Facilitate connections between food donors and recipients</li>
                <li>Provide, maintain, and improve our services</li>
                <li>Process and complete donation transactions</li>
                <li>Send notifications about donation opportunities or confirmations</li>
                <li>Generate analytics and reports on platform usage and impact</li>
                <li>Comply with legal obligations</li>
              </ul>
              
              <h2>4. Information Sharing</h2>
              <p>
                We may share certain information between donors and recipients to facilitate donations. We do not sell 
                your personal information to third parties. We may share anonymized, aggregate data for research or 
                statistical purposes.
              </p>
              
              <h2>5. Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information. 
                However, no method of transmission over the internet or electronic storage is 100% secure, and we 
                cannot guarantee absolute security.
              </p>
              
              <h2>6. Your Rights</h2>
              <p>
                Depending on your location, you may have rights to access, correct, delete, or restrict the use of your 
                personal information. To exercise these rights, please contact us at the email provided below.
              </p>
              
              <h2>7. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the 
                new Privacy Policy on this page and updating the "Last Updated" date.
              </p>
              
              <h2>8. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at privacy@foodrescueconnect.example.com.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Privacy;
