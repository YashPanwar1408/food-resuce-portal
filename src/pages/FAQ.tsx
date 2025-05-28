import React from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel } from '@reach/accordion';
import '@reach/accordion/styles.css';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const FAQ = () => (
  <>
    <Navbar />
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-5xl font-bold mb-8 text-primary">Frequently Asked Questions</h1>
      <Accordion className="w-full max-w-4xl space-y-4">
        <AccordionItem>
          <AccordionButton className="bg-white p-4 rounded-lg shadow-md w-full text-left">
            <h2 className="text-xl font-semibold">What is FoodRescue Connect?</h2>
          </AccordionButton>
          <AccordionPanel className="p-4 bg-gray-50 rounded-lg">
            FoodRescue Connect is a platform that connects restaurants with NGOs to reduce food waste and fight hunger.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton className="bg-white p-4 rounded-lg shadow-md w-full text-left">
            <h2 className="text-xl font-semibold">How can I get involved?</h2>
          </AccordionButton>
          <AccordionPanel className="p-4 bg-gray-50 rounded-lg">
            You can sign up as a restaurant, NGO, or delivery personnel to contribute to our mission.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton className="bg-white p-4 rounded-lg shadow-md w-full text-left">
            <h2 className="text-xl font-semibold">Is there a cost to join?</h2>
          </AccordionButton>
          <AccordionPanel className="p-4 bg-gray-50 rounded-lg">
            No, joining FoodRescue Connect is completely free for all participants.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton className="bg-white p-4 rounded-lg shadow-md w-full text-left">
            <h2 className="text-xl font-semibold">How does FoodRescue Connect ensure food safety?</h2>
          </AccordionButton>
          <AccordionPanel className="p-4 bg-gray-50 rounded-lg">
            We work closely with our partners to ensure all food donations meet safety guidelines, including proper storage and handling.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton className="bg-white p-4 rounded-lg shadow-md w-full text-left">
            <h2 className="text-xl font-semibold">Can I track the impact of my donations?</h2>
          </AccordionButton>
          <AccordionPanel className="p-4 bg-gray-50 rounded-lg">
            Yes, our platform provides detailed metrics on the impact of your donations, including the number of meals provided.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </motion.div>
    <Footer />
  </>
);

export default FAQ;
