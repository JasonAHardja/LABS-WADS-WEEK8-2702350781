import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

import todoRoute from "./routes/todoRoute.js"; 
import usersRoute from "/Users/jasonhardjawidjaja/Desktop/LABS WADS/AssignmentWeek7/Routes/usersroute"; 

dotenv.config();

const app = express();
app.use(express.json()); 
app.use(cors()); 
app.use(cookieParser()); 

const CONNECTION_URL = process.env.CONNECTION_URL || "mongodb+srv://jasonhardjawidjaja:safeandnewpassword456@cluster0.xekuk.mongodb.net/todolistDB?retryWrites=true&w=majority&appName=Cluster0";
const PORT = process.env.PORT || 5001;

mongoose.set("strictQuery", true);

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB connected successfully");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => console.error("MongoDB connection error:", error));

app.use("/service/todo", todoRoute);
app.use("/service/user", usersRoute);

app.get("/", (req, res) => {
    res.send("Welcome to the MERN To-Do List Backend!");
});
