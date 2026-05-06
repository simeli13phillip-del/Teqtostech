const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.send("TeQtos backend is running 🚀");
});

// Roles route (your platform idea expanded)
app.get("/roles", (req, res) => {
    res.json([
        "technician",
        "recruiter",
        "service provider",
        "dj",
        "instrument player",
        "influencer"
    ]);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});