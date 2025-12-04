import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import generateTasksRoute from "./routes/generateTasks.js";

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Routes
app.use("/api", generateTasksRoute);

// Root test route
app.get("/", (req, res) => {
  res.send("AI Health Backend is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
