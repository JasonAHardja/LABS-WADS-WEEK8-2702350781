import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import todoRoute from "./Routes/todoRoute.js";

const app = express();
dotenv.config()

app.use(express.json()); // Built-in body-parser for parsing JSON
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(cookieParser()); // Enable cookie parsing

const CONNECTION_URL = "mongodb+srv://jasonhardjawidjaja:safeandnewpassword456@cluster0.xekuk.mongodb.net/todolistDB?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected successfully"))
    .catch((error) => console.error("MongoDB connection error:", error));

app.use("/service/todo", todoRoute)
mongoose.set("strictQuery", true)

app.get("/", (req, res) => {
    res.send("Welcome to the MERN To-Do List Backend!");
});

// Start the server
const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});