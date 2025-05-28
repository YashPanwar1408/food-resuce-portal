import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import { motion } from 'framer-motion';
import { openRazorpay } from '../lib/razorpay';
import {toast} from "sonner"

const Donate = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !amount) {
      toast.error('Please fill all fields.');
      return;
    }
    await openRazorpay({ amount: Number(amount), name, email });
  };

  return (
    <>
      <Navbar />
      <motion.div
        className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-bold mb-8 text-primary">Donate Us</h1>
        <p className="text-gray-600 text-center max-w-3xl mb-12 leading-relaxed">
          Your contributions help us make a difference. Support our mission to rescue food and feed those in need.
        </p>
        <form className="bg-white p-6 rounded-lg shadow-md max-w-md w-full" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
              Donation Amount
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="amount"
              type="number"
              placeholder="Amount in INR"
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />
          </div>
          <button
            className="bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-primary-dark"
            type="submit"
          >
            Donate Now
          </button>
        </form>
      </motion.div>
    </>
  );
};

export default Donate;
