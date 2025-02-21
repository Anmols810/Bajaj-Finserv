const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.post("/bfhl", (req, res) => {
    try {
        const { data } = req.body;
        if (!Array.isArray(data)) {
            return res.status(400).json({ is_success: false, message: "Invalid input" });
        }

        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));

        let highestAlphabet = [];
        if (alphabets.length > 0) {
            highestAlphabet = [alphabets.sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' })).pop()];
        }

        return res.json({
            is_success: true,
            user_id: "john_doe_17091999",
            email: "john@xyz.com",
            roll_number: "ABCD123",
            numbers,
            alphabets,
            highest_alphabet: highestAlphabet
        });
    } catch (error) {
        res.status(500).json({ is_success: false, message: "Server error" });
    }
});
app.get("/bfhl", (req, res) => {
    res.json({ operation_code: 1 });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
