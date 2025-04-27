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

router.post("/chat", async (req, res) => {
  try {
    const { weight, fatPercentage, goal, followUp, history } = req.body;

    if (!weight || !fatPercentage || !goal) {
      return res.status(400).json({ error: "All fields (weight, fatPercentage, goal) are required." });
    }

    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Transfer-Encoding", "chunked");

    // Build initial messages for the first question
    const messages = [
      { role: "system", content: systemPrompt },
      { role: "user", content: `Weight: ${weight}, Fat Percentage: ${fatPercentage}, Goal: ${goal}` },
    ];

    // If there is history (past questions/answers), add it
    if (history && Array.isArray(history)) {
      history.forEach((h) => {
        messages.push({ role: "user", content: h.question });
        messages.push({ role: "assistant", content: h.answer });
      });
    }

    // If there's a follow-up, treat it as a new prompt in the conversation
    if (followUp) {
      messages.push({ role: "user", content: `Follow-up question: ${followUp}` });
    }

    const stream = await groq.chat.completions.create({
      messages,
      model: "llama-3.3-70b-versatile",
      temperature: 0.5,
      max_completion_tokens: 1024,
      top_p: 1,
      stream: true,
    });

    // Send response back to client in chunks
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || "";
      res.write(content);
    }

    res.end();
  } catch (error) {
    console.error("Error processing /chat request:", error);
    if (!res.headersSent) {
      res.status(500).json({
        error: "Chat service is currently unavailable.",
        details: error.message,
      });
    }
  }
});



export default router;
