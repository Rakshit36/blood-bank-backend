require('dotenv').config(); // This is only needed once, at the very top.

const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");

const app = express();
const port = 3177;

// Middleware setup
app.use(cookieParser());
app.use(express.json());
app.use(
    cors({
        origin: [
            "http://localhost:3000",
        ],
        credentials: true,
    })
);

// --- Corrected Database Connection ---
// Using an async function for a clean connection with modern syntax.
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true, // Optional: For index-related warnings
        });
        console.log("Connected successfully to database");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1); // Exit process with failure
    }
};

connectDB();
// ------------------------------------

// Routers
app.use("/auth", require("./routers/authRouter"));
app.use("/user", require("./routers/userRouter"));
app.use("/bank", require("./routers/bankRouter"));
app.use("/camps", require("./routers/campRouter"));

app.listen(port, () =>
    console.log(`Server running at http://localhost:${port}`)
);