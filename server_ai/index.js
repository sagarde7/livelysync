import dotenv from "dotenv";
dotenv.config();


import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";


const app = express();

app.use(cors());
app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const SYSTEM_PROMPT = "You are an expert AI assistant with vast knowledge in Computer Science and Mathematics. You are helping a student with their studies. The student asks you a question and expects a crisp and concise answer."

app.post("/api/gemini", async (req, res) => {
    try {
        const { user_prompt } = req.body;
        if(!user_prompt) {
            return res.status(400).json({ error: "User prompt is required" });
        }

        const prompt = SYSTEM_PROMPT + user_prompt;
        const result = await model.generateContent(prompt);
        const response = result.response.text();

        res.status(200).json({ response });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});