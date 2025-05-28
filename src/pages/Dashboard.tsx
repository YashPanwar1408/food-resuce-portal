import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useRef, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { UserCircle } from 'lucide-react';
import type { FoodRequest, Donation, DonationRow } from '../types';
import jsPDF from "jspdf";
import { Navigate, redirect, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Animated StatCard component
const StatCard = ({ label, value, color }: { label: string; value: number; color: string }) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 900;
    const increment = value / (duration / 16);
    let frame: number;
    function animate() {
      start += increment;
      if (start < value) {
        setAnimatedValue(Math.floor(start));
        frame = requestAnimationFrame(animate);
      } else {
        setAnimatedValue(value);
      }
    }
    animate();
    return () => cancelAnimationFrame(frame);
  }, [value]);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`bg-white p-6 rounded-xl shadow text-center border-t-4 border-${color}-400`}
      whileHover={{ scale: 1.04 }}
    >
      <h3 className="text-gray-500">{label}</h3>
      <p className={`text-3xl font-bold text-${color}-700 mt-2`}>{animatedValue}</p>
    </motion.div>
  );
};

const Dashboard = () => {
  async function getTotalDonations() {
  const { data, error } = await supabase
    .from('donation_summary')
    .select('total')
    .eq('id', 1)  // Assuming the total is stored in row with id=1
    .single<{ total: number }>();    // Explicitly type the returned data

  if (error) {
    console.error('Error fetching total donations:', error);
    return null;
  }

  return data ? data.total : null;
}
const [totalDonations, setTotalDonations] = useState(0);
useEffect(() => {
    async function fetchTotal() {
      const total = await getTotalDonations();
      if (total !== null) {
        setTotalDonations(total);
      }
    }

    fetchTotal();
  }, []);
  const Navigate=useNavigate()
  const handleRoute=()=>{
    Navigate("/uploadFoodImage");
  }
  const fileInputRef = useRef<HTMLInputElement | null>(null)
const handleButtonClick = () => {
fileInputRef.current?.click()
}
const handleFileChange = (e:
React.ChangeEvent<HTMLInputElement>) => {
const file = e.target.files?.[0]
if (file) {
console.log('Selected image:', file)
}
}
  const { user, signOut } = useAuth();
  const userType = user?.user_metadata?.user_type || 'Not specified';
  const name = user?.user_metadata?.name || 'Not specified';

const [requestFormData, setRequestFormData] = useState<FoodRequest>({
  dailyrequirement: '',
  members: '',
  name: name,
});
  const handleRequestChange=(e)=>{
    setRequestFormData({ ...requestFormData,[e.target.name]:e.target.value});
  }
  const handleRequestSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const { error } = await supabase.from('food_requests').insert([requestFormData as FoodRequest]);
  if (error) {
    console.error('Insert error:', error.message);
  } else {
    toast.success('Your request is initailized and will be proccessed soon');
    setTimeout(async()=>{
       toast.success('Your Request have been approved and soon a delivery partner will be assigned to complete you order');
       const updatedTotalDonation = totalDonations - Number(requestFormData.dailyrequirement);
       const { error: updateError } = await supabase
    .from('donation_summary')
    .update({ total: updatedTotalDonation })
    .eq('id', 1);

  if (updateError) {
    console.error('Failed to update total:', updateError);
  } else {
    setTotalDonations(updatedTotalDonation);
     setTimeout(()=>{
      window.location.reload();
     },2000)

  }
    },10000)
  }
};
 const [formData, setFormData] = useState<Donation>({
    daily_leftover: '',
    address: '',
    donation: '',
    name: name,
  });
   const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const foodAvg = (document.getElementsByClassName("foodAvg")[0] as HTMLInputElement)?.value;
   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

   const foodAvg = (document.getElementsByClassName("foodAvg")[0] as HTMLInputElement)?.value;
  const address = (document.getElementsByClassName("address")[0] as HTMLInputElement)?.value;
  const ration = (document.getElementsByClassName("ration")[0] as HTMLInputElement)?.value;
   const receiptText = `
  Food Donation Receipt

  Date: ${new Date().toLocaleString()}
  Resturant name: ${name}
  Daily average leftover food: ${foodAvg} kg
  Address: ${address}
  Ration you want to donate: ${ration} kg

  Thank you for your contribution!
  `;
 const doc = new jsPDF();
  doc.setFontSize(12);
  doc.text(receiptText, 10, 20);
  doc.save("Donation_Receipt.pdf");
  const { error } = await supabase.from('donations').insert([formData as Donation]);
  if (error) {
    console.error('Insert error:', error.message);
  } else {
    toast.success('Donation submitted successfully!');
  }
};
  const handleLogout = () => {
    signOut();
  };

  const [showForm, setShowForm] = useState(false);

const [restaurantDonations, setRestaurantDonations] = useState({});

useEffect(() => {
  const fetchDonationsByRestaurant = async () => {
  const { data, error } = await supabase
    .from('donations')
    .select('name, donation');

  if (error) {
    console.error('Error fetching grouped donations:', error.message);
    return;
  }

  const rows = (data ?? []) as DonationRow[];
  // Group and sum
  const grouped = rows.reduce((acc, curr) => {
    const restaurant = curr.name;
    const amount = Number(curr.donation || 0);
    acc[restaurant] = (acc[restaurant] || 0) + amount;
    return acc;
  }, {} as Record<string, number>);

  setRestaurantDonations(grouped);
};

  fetchDonationsByRestaurant();
}, []);

  const fakeRestaurants = ['Spicy Bites', 'Food Palace', 'Yummy Meals'];
  const faqs = userType === 'ngo'
    ? [
        {
          question: 'How do I request food from restaurants?',
          answer:
            'Click on “Request Food” under Quick Actions. A form will appear asking for your daily food requirement, number of beneficiaries, and preferred restaurant partners. Submit the request, and restaurants in your area will be notified.',
        },
        {
          question: 'Can I track which restaurant is fulfilling my request?',
          answer:
            'Yes, once a restaurant accepts your request, its details will appear under your “View Requests” section along with the estimated delivery time and contact information.',
        },
        {
          question: 'Can I edit or cancel a request after submitting?',
          answer:
            'Absolutely. Go to the “View Requests” section, select the request you want to modify, and choose either “Edit” or “Cancel”. Please do so before the restaurant accepts the request.',
        },
        {
          question: 'What if food delivered is not good?',
          answer:
            'You can raise an issue via “Help & Support”. Include details and photos. We’ll handle it seriously and take action to ensure quality.',
        },
      ]
    : [
        {
          question: 'How do I donate surplus food?',
          answer:
            'Click on “Create Donation” under Quick Actions. Fill in food details including quantity, expiry time, and upload a photo. NGOs in need will be notified instantly.',
        },
        {
          question: 'Can I see which NGO accepted my donation?',
          answer:
            'Yes, once an NGO accepts your donation, their details will be shown under the “View Donations” section. You’ll also receive a confirmation email.',
        },
        {
          question: 'Is the food pickup managed by the NGO?',
          answer:
            'Yes. Once a donation is accepted, the respective NGO arranges pickup and transportation. You’ll be informed about the pickup time and contact person.',
        },
        {
          question: 'What type of food is accepted for donation?',
          answer:
            'We accept freshly prepared meals, packaged items, and dry goods. Please ensure the food is stored hygienically and is consumable for at least 4-6 hours.',
        },
      ];
      
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 bg-[#f7fdfb] py-10">
        <div className="container-custom space-y-8">

          {/* Profile Card - Swiggy Style */}
          <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center mb-8">
            <UserCircle className="w-20 h-20 text-green-600 mb-3" />
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
              <p className="text-gray-600">{user?.email}</p>
              <span className="inline-block mt-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                {userType.toUpperCase()}
              </span>
              <div className="mt-2 text-gray-400 text-xs">Joined: {new Date(user?.created_at).toLocaleDateString()}</div>
            </div>
            <Button variant="destructive" onClick={handleLogout} className="mt-4">Log Out</Button>
          </motion.div>

          {/* CHARTS - Move to top under profile (now two charts side by side) */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="my-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pie Chart (NGO) or Donations Over Time (Restaurant) */}
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center">
              <h3 className="text-lg font-semibold mb-4 text-green-700">
                {userType === 'ngo' ? '' : 'Donations Over Time'}
              </h3>
              {userType === 'ngo' && (
                <StatCard label="Total Donation (kg)" value={totalDonations} color="green" />
              )}
              <ResponsiveContainer width="100%" height={220}>
                {userType === 'ngo' ? (
                  <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center">
                <h3 className="text-lg font-semibold mb-4 text-green-700">Donations Over Time</h3>
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart data={[
                    { date: '2025-05-10', donation: 40 },
                    { date: '2025-05-11', donation: 70 },
                    { date: '2025-05-12', donation: 55 },
                    { date: '2025-05-13', donation: 90 },
                    { date: '2025-05-14', donation: 120 },
                    { date: '2025-05-15', donation: 60 },
                  ]}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="donation" fill="#34d399" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
                ) : (
                  // Donations Over Time (Restaurant)
                  <BarChart data={[
                    { date: '2025-05-10', donation: 40 },
                    { date: '2025-05-11', donation: 70 },
                    { date: '2025-05-12', donation: 55 },
                    { date: '2025-05-13', donation: 90 },
                    { date: '2025-05-14', donation: 120 },
                    { date: '2025-05-15', donation: 60 },
                  ]}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="donation" fill="#34d399" radius={[8, 8, 0, 0]} />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
            {/* Second Chart: BarChart for NGO, PieChart for Restaurant */}
            {userType === 'ngo' && (
               <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center">
              <h3 className="text-lg font-semibold mb-4 text-green-700">Donations By Resturants</h3>
              <ResponsiveContainer  width="100%" height={220}>
              <PieChart>
                    <Pie
                      data={Object.entries(restaurantDonations).map(([name, donation]) => ({ name, value: donation }))}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#34d399"
                      label
                    >
                      {Object.entries(restaurantDonations).map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={["#34d399", "#6ee7b7", "#10b981", "#059669"][idx % 4]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                  </ResponsiveContainer>
                  </div>
            )}
          </motion.div>

          {/* Stats Summary - Animated Counters */}
         
            {userType === 'ngo' ? (
              <>
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <StatCard label="Total Donation (kg)" value={totalDonations} color="green" />
                <StatCard label="People Served Daily" value={20} color="blue" />
                <StatCard label="Restaurants connected" value={Object.keys(restaurantDonations).length} color="purple" />
               </motion.div>
              </>
            ) : (
              <>
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <StatCard label="Total donations available" value={(totalDonations)} color="purple" />
                <StatCard label="Daily Leftover" value={Number(foodAvg) || 10} color="blue" />
                </motion.div>
              </>
            )}
        

          {/* Quick Actions - single, visually aligned */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold text-green-700 mb-4">Quick Actions</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {userType === 'ngo' ? (
                <Button className="w-full max-w-xs" onClick={() => setShowForm(!showForm)}> Request Food</Button>
              ) : (
                <>
                  <Button className="w-full max-w-xs" onClick={() => setShowForm(!showForm)} variant="outline">Donate Food</Button>
                  <Button className="w-full max-w-xs" variant="outline"> View Donations</Button>
                  <Button className="w-full max-w-xs" variant="outline" onClick={handleRoute}> Upload Food Image</Button>
                  <input type="file" accept='image/*' ref={fileInputRef} className='hidden' onChange={handleFileChange} />
                </>
              )}
            </div>
            {/* Forms remain unchanged */}
            {userType === 'ngo' && showForm ? (
              <form onSubmit={handleRequestSubmit}>
                <div className="mt-6 space-y-4">
                 
                  <label className="block">
                    <span className="text-gray-700 font-medium">Your Ration Requirement (kg)</span>
                    <input onChange={handleRequestChange} name="dailyrequirement" type="number" className="mt-1 block w-full border rounded p-2" />
                  </label>
                  <label className="block">
                    <span className="text-gray-700 font-medium">Number of Members</span>
                    <input onChange={handleRequestChange} name="members" type="number" className="mt-1 block w-full border rounded p-2" />
                  </label>
                  <Button type="submit" variant="default" className="mt-2">Submit Request</Button>
                </div>
              </form>
            ) : userType === 'restaurant' && showForm && (
              <form onSubmit={handleSubmit}>
                <div className="mt-6 space-y-4">
                  <label className="block">
                    <span className="text-gray-700 font-medium">Daily average leftOverFood in your restaurant (kg) </span>
                    <input onChange={handleChange} type="number" name="daily_leftover" className=" foodAvg mt-1 block w-full border rounded p-2" />
                  </label>
                  <label className="block">
                    <span className="text-gray-700 font-medium">Your Complete Address</span>
                    <input onChange={handleChange} type="text" name="address" className=" address mt-1 block w-full border rounded p-2" />
                  </label>
                  <label className="block">
                    <span className="text-gray-700 font-medium">How much Ration you want to donate(kg)</span>
                    <input onChange={handleChange} type="number" name="donation" className=" ration mt-1 block w-full border rounded p-2" />

                  </label>
                  <Button type="submit" variant="default" className="mt-2">Submit Request</Button>
                </div>
              </form>
            )}
          </div>

          {/* Restaurant List - Animated Cards, Swiggy Style */}
          {userType === 'ngo' && (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.15
                  }
                }
              }}
            >
              {Object.entries(restaurantDonations).map(([name, donation], idx) => (
                <motion.div
                  key={name}
                  className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform duration-300 border border-green-100"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 * idx }}
                >
                  <UserCircle className="w-12 h-12 text-green-600 mb-2" />
                  <div className="font-bold text-lg text-green-900">{name}</div>
                  <div className="text-green-700">Donated: <span className="font-bold">{donation} kg</span></div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* FAQs Section */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold text-green-700 mb-4">
              {userType === 'NGO' ? 'NGO FAQs' : 'Restaurant FAQs'}
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-4">
                  <button
                    className="w-full flex justify-between items-center text-left text-gray-800 font-medium"
                    onClick={() =>
                      setOpenIndex(openIndex === index ? null : index)
                    }
                  >
                    <span>{faq.question}</span>
                    <span className="text-green-600 text-xl">
                      {openIndex === index ? '−' : '+'}
                    </span>
                  </button>
                  {openIndex === index && (
                    <p className="mt-2 text-gray-600 text-sm">{faq.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </div>


        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
