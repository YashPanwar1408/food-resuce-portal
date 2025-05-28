// Razorpay integration utility
export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export const openRazorpay = async ({ amount, name, email }) => {
  const res = await loadRazorpayScript();
  if (!res) {
    alert('Razorpay SDK failed to load. Are you online?');
    return;
  }

  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: amount * 100, // Amount in paise
    currency: 'INR',
    name: 'FoodRescue Connect',
    description: 'Donation',
    handler: function (response) {
      alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
    },
    prefill: {
      name,
      email,
    },
    notes: {
      donation_purpose: 'Food Rescue',
    },
    theme: {
      color: '#22c55e',
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};
