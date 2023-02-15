require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./db");
const tutorRoutes = require("./routes/tutorRoutes");
const authRoutes = require("./routes/auth");

// Connect to database
connectDB();


// middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", tutorRoutes);
app.use("/api", authRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });