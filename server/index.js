import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// const ai = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY, // NOT exposed to frontend
// });

if (!process.env.GEMINI_API_KEY) {
  console.error("GEMINI_API_KEY is missing in .env");
}

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});


app.post("/api/generate-code", async (req, res) => {
  try {
    const { prompt, frameworkLabel } = req.body;

    const fullPrompt = `
You are an experienced programmer with expertise in web development and UI/UX design...

Now, generate a UI component for: ${prompt}
Framework to use: ${frameworkLabel}
...same instructions as before...
`.trim();
   
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: fullPrompt,
    });

    const text = response.text;
    res.json({ text });
  } catch (err) {
    console.error("Backend Gemini error:", err);
    res.status(500).json({ error: "Failed to generate code" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

