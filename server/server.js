import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fetch from "node-fetch"; // 👈 Make sure it's installed: npm install node-fetch

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Existing chat model
const chatModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// Vision model
const visionModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); 

/**
 * Chat endpoint
 */
app.post("/api/chat", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ reply: "No prompt provided." });
  }

  try {
    const result = await chatModel.generateContent([
      `You are an expert assistant on a food redistribution website called FoodRescue Connect. The site connects restaurants and hotels with leftover food to NGOs and charities who need it.

Your job is to:
- Guide users based on whether they are donors (restaurants, hotels) or receivers (NGOs).
- Help users navigate the website, explain features, or troubleshoot issues.
- Keep all responses **concise** (1–3 short sentences), but **clear and tailored**.
- Maintain a friendly, helpful tone — avoid long paragraphs.

Examples of good replies:
- "To donate food, click 'Get Started', then fill in the food details."
- "As an NGO, go to 'Find Food' to see nearby available donations."
- "You can track donations under 'My Listings' after signing in."

Avoid:
- Long paragraphs
- Generic answers

Please respond to the user's message accordingly:
`,
      prompt,
    ]);

    const reply = result.response.text();
    res.json({ reply });
  } catch (err) {
    console.log(err);
    res.status(500).json({ reply: "Something went wrong!" });
  }
});

/**
 * Analyze food image using Gemini Vision Pro
 */
app.post("/api/analyze-food-image", async (req, res) => {
  const { imageUrl } = req.body;

  if (!imageUrl) {
    return res.status(400).json({ reply: "Image URL is required." });
  }

  try {
    const base64Image = await fetchImageAsBase64(imageUrl);

    const result = await visionModel.generateContent({
      contents: [
        {
          parts: [
            {
              text: `You are an expert food nutritionist and image analyst. Your task is to analyze the food items present in the image provided via URL. Provide the following information in a concise format (ideally one word or a short phrase per category):

Identified Food Items: (List all clearly visible individual food items)
Estimated Total Quantity: (give in kgs or g)
Dominant Cuisine Style (if discernible): (e.g., Italian, Indian, Mexican, Western, etc.)
Likely Primary Macronutrients: (try to give quantity of each macronutrinet like carbohydrates this much kg or g etc etc )
Visually Evident Preparation Methods: (e.g., Fried, Baked, Grilled, Raw, Steamed)
Overall Nutritional Impression: (e.g., Healthy, Moderate, Rich, Light)
Make sure to add a fun fact but image at last in one liner 
Check if the food looks fresh or not.
Give a calorie count too in cal or kcal 

Always try to be shorter, one liner for each type is fine. be concise and shorter
Analyze the image at the following URL: ${base64Image}`,
            },
            {
              inlineData: {
                mimeType: "image/jpeg",
                data: base64Image,
              },
            },
          ],
        },
      ],
    });

    const reply = result.response.text();
    res.json({ reply });
  } catch (err) {
    console.error("Vision Pro Error:", err);
    res.status(500).json({ reply: "Image analysis failed." });
  }
});

/**
 * Helper: Convert image URL to base64
 */
async function fetchImageAsBase64(url) {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  return Buffer.from(buffer).toString("base64");
}

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
