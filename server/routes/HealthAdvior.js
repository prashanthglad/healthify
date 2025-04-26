import express from "express";
import { systemPrompt } from "../systemPropmt.js";
import Groq from "groq-sdk";
import dotenv from "dotenv";
import { authenticateToken } from "../middleware/middleware.js";

dotenv.config();

const router = express.Router();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

router.post("/health", async (req, res) => {
  
  try {
    const { weight, fatPercentage, goal } = req.body;
    console.log("Received message:", req.body);

    if (!weight || !fatPercentage || !goal) {
      return res.status(400).json({ error: "All fields (weight, fatPercentage, goal) are required." });
    }

    // Set headers correctly forcd streaming
    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Transfer-Encoding", "chunked");

    const stream = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Weight: ${weight}, Fat Percentage: ${fatPercentage}, Goal: ${goal}` },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.5,
      max_completion_tokens: 1024,
      top_p: 1,
      stream: true,
    });

    // Stream response to the client
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || "";
      console.log("Streaming chunk:", content);
      res.write(content); // Send chunk
    }

    res.end(); // Close connection after all chunks are sent
  } catch (error) {
    console.error("Error processing /health request:", error);
    if (!res.headersSent) {
      res.status(500).json({
        error: "Health advisor service is currently unavailable.",
        details: error.message,
      });
    }
  }
});

export default router;
