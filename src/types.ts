// Minimal type definitions for Supabase tables used in Dashboard.tsx
export type FoodRequest = {
  dailyrequirement: string;
  members: string;
  name: string;
};

export type Donation = {
  daily_leftover: string;
  address: string;
  donation: string;
  name: string;
};

export type DonationRow = {
  name: string;
  donation: string | number;
};
