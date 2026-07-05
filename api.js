const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// 1. Database Connection Logic (Replaces signup.php connection)
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'auction_db'
});

db.connect((err) => {
    if (err) {
        console.error("DEBUG: Database connection failed:", err.message);
    } else {
        console.log("DEBUG: Connected to auction_db via Node.js");
    }
});

// 2. Mock database of jobs
const jobs = [
    { id: 1, title: "UI/UX Designer", company: "Google" },
    { id: 2, title: "Frontend Developer", company: "Meta" },
    { id: 3, title: "Backend Engineer", company: "Amazon" }
];

// 3. API endpoint to get all jobs
router.get('/jobs', (req, res) => {
    console.log("DEBUG: Fetching jobs list...");
    res.json(jobs);
});

// 4. Integrated Login Endpoint (The logic from signup.php converted for Node)
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ status: 'error', message: 'Please provide email and password' });
    }

    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], (err, results) => {
        if (err) {
            return res.status(500).json({ status: 'error', message: 'Database error' });
        }

        if (results.length > 0) {
            const user = results[0];
            
            // Password verification
            if (password === user.password) {
                res.json({
                    status: 'success',
                    message: 'Login successful',
                    user: {
                        username: user.username,
                        role: user.role || 'user'
                    }
                });
            } else {
                res.status(401).json({ status: 'error', message: 'Invalid password' });
            }
        } else {
            res.status(404).json({ status: 'error', message: 'Email not found' });
        }
    });
});

module.exports = router;