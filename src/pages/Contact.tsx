import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const Contact = () => (
  <>
    <Navbar />
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-5xl font-bold mb-8 text-primary">Contact Us</h1>
      <p className="text-gray-600 text-center max-w-3xl mb-12 leading-relaxed">
        Have questions or need assistance? We are here to help! Reach out to us through any of the following methods, and our team will get back to you as soon as possible.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        <motion.div
          className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md"
          whileHover={{ scale: 1.05 }}
        >
          <MapPin className="h-12 w-12 text-primary mb-4" />
          <h2 className="text-xl font-semibold mb-2">Our Address</h2>
          <p className="text-gray-600 text-center">123 FoodRescue Lane, Sustainability City, Earth</p>
        </motion.div>
        <motion.div
          className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md"
          whileHover={{ scale: 1.05 }}
        >
          <Mail className="h-12 w-12 text-primary mb-4" />
          <h2 className="text-xl font-semibold mb-2">Email Us</h2>
          <p className="text-gray-600 text-center">contact@foodrescueconnect.com</p>
        </motion.div>
        <motion.div
          className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md"
          whileHover={{ scale: 1.05 }}
        >
          <Phone className="h-12 w-12 text-primary mb-4" />
          <h2 className="text-xl font-semibold mb-2">Call Us</h2>
          <p className="text-gray-600 text-center">+1 (800) 123-4567</p>
        </motion.div>
      </div>
      <div className="mt-12 w-full max-w-5xl">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.8398393492!2d77.06889999999999!3d28.527280000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce38d2f2d3e0f%3A0x2e9b1b1b1b1b1b1b!2sDelhi!5e0!3m2!1sen!2sin!4v1684080000000!5m2!1sen!2sin"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <motion.div
        className="mt-12 bg-primary/10 p-6 rounded-lg shadow-md max-w-4xl text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-semibold text-primary mb-4">We Value Your Feedback</h2>
        <p className="text-gray-600">
          Your input helps us improve and serve you better. Feel free to share your thoughts, suggestions, or concerns with us.
        </p>
      </motion.div>
    </motion.div>
    <Footer />
  </>
);

export default Contact;
