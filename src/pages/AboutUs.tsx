import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const AboutUs = () => (
  <>
    <Navbar />
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-5xl font-bold mb-8 text-primary">About Us</h1>
      <p className="text-gray-600 text-center max-w-3xl leading-relaxed mb-12">
        At FoodRescue Connect, we are passionate about reducing food waste and fighting hunger. Our platform bridges the gap between restaurants with excess food and NGOs that can distribute it to those in need.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
          <img src="/path-to-logo1.png" alt="NGO Logo 1" className="h-16 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Partner NGO 1</h2>
          <p className="text-gray-600 text-center">Working together to fight hunger and reduce food waste.</p>
        </div>
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
          <img src="/path-to-logo2.png" alt="NGO Logo 2" className="h-16 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Partner NGO 2</h2>
          <p className="text-gray-600 text-center">Collaborating to create a sustainable future.</p>
        </div>
      </div>
    </motion.div>
    <Footer />
  </>
);

export default AboutUs;
