import dotenv from "dotenv";
dotenv.config();
import express from "express";

import cors from "cors";
import { connectDB } from "./db/DB.js";
import AuthRoutes from "./routes/auth.js";
import HealthAdvisor from "./routes/HealthAdvior.js";
const app = express();

app.use(express.json());

app.use(cors());
connectDB();
app.use("/auth", AuthRoutes);
app.use("/ai", HealthAdvisor);

app.listen(3000, () => {
  console.log("Server is running at 3000");
});
