import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import route from "./routes/route.js";

const app = express();

app.use(express.json({ limit: '50mb' }));

app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] }));

mongoose.connect(
    "mongodb://localhost:27017/alumni"
);

mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
})

mongoose.connection.on("error", (err) => {
    console.log("Error connecting to MongoDB", err);
})

app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.use("/api", route);

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})