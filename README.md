# 🍽️ Food Rescue Portal

**Empowering a Hunger-Free World — Bridging Restaurants and NGOs to Prevent Food Wastage**

---

## 🌟 Overview

**Food For All** is a full-stack web platform designed to **combat food waste and hunger** by building a bridge between **restaurants with surplus food** and **NGOs serving the underprivileged**.

In a world where tons of food go to waste daily while millions sleep hungry, this app offers a **technological and humanitarian solution**. It enables restaurants to easily **donate excess food** and empowers NGOs to **request and collect food** from their vicinity.

### 🫶 Social Impact
- ♻️ **Reduces food wastage** by redirecting edible leftovers to those in need.
- 🍛 **Feeds hungry communities** with nutritious meals.
- 🤝 **Fosters collaboration** between businesses and social organizations.
- 🌍 **Promotes sustainable practices** in the food industry.
- 💡 Raises awareness about hunger and food resource management.
- 🧑‍💻 Makes **technology accessible for social good** through AI and automation.

Together, we aim to create a **more compassionate, sustainable, and connected world**.

---

## 🔧 Tech Stack

| Frontend | Backend | Database | AI | Deployment |
|----------|---------|----------|----|------------|
| Vite + React | Express.js | Supabase | Gemini API | Vercel |

---

## ✨ Features

### 🍴 For Restaurants
- Upload leftover food images to get **nutritional analysis** & quantity estimation.
- Donate food in real-time.
- Track donation history.

### 🧑‍🤝‍🧑 For NGOs
- Browse available food donations.
- **Request food** with a single click.
- View food details using AI assistance.

### 🤖 Integrated AI Chatbot
- Built with **Gemini API**.
- Smart assistance for donation, request help, and FAQs.

### 🧠 AI Food Analyzer
- Upload food images and receive:
  - 📋 Nutritional facts (calories, proteins, etc.)
  - 🍛 Cuisine type detection
  - 🍽️ Estimated food quantity

---

## 🔐 Authentication

- Role-based access: **Restaurant** & **NGO**
- Uses **Supabase Auth** for secure login & signup
- Each role has tailored dashboard functionalities

---

## 📸 How It Works

1. **Restaurant uploads food image** 📷
2. **AI analyzes food** – nutrition, quantity, cuisine 🍱
3. **Restaurant donates food** ➡️ 📦
4. **NGO requests or receives food** 🙏

---

## 🚀 Deployment

- **Frontend** hosted on **Vercel**
- **Backend API** hosted with Express server
- **Supabase** for Realtime DB & Auth
- **AI Services** via Gemini API

---

## 🖼️ Screenshots

> _Include screenshots here to show login, donation panel, AI analyzer result, chatbot, etc._

---

## 🧪 Run Locally

```bash
# Clone the repo
git clone https://github.com/your-username/food-for-all.git
cd food-for-all

# Install frontend dependencies
npm install
npm run dev

# Install backend dependencies
cd ../server
npm install
node index.js
