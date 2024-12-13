const db = require('../configs/db');

// Register Controller
const register = (req, res) => {
    const { username, password } = req.body;

    // Validasi input
    if (!username || !password) {
        return res.status(400).send({ error: 'Username and password are required' });
    }

    // Query SQL untuk menambahkan user baru
    const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
    db.query(sql, [username, password], (err, result) => {
        if (err) {
            return res.status(500).send({ error: 'Database error', details: err });
        }
        res.redirect('/login'); // Redirect ke halaman login setelah sukses
    });
};

// Render Halaman Register
const HalamanRegister = (req, res) => {
    res.render('register', {
        title: 'Register',
        layout: 'layouts/main-layout',
        shownav: false,
        showfooter: false
    });
};

// Login Controller
const Login = (req, res) => {
    const { username, password } = req.body;

    // Validasi input
    if (!username || !password) {
        return res.status(400).send({ error: 'Username and password are required' });
    }

    // Query SQL untuk memeriksa kredensial
    const query = "SELECT * FROM users WHERE username = ? AND password = ?";
    db.query(query, [username, password], (err, result) => {
        if (err) {
            return res.status(500).send({ error: 'Database error', details: err });
        }

        // Periksa apakah user ditemukan
        if (result.length === 0) {
            return res.status(401).send({ error: 'Invalid username or password' });
        }

        // Login sukses
        req.session.user = result[0];
        res.redirect('/');
    });
};

// Render Halaman Login
const HalamanLogin = (req, res) => {
    res.render('login', {
        title: 'Login',
        layout: 'layouts/main-layout',
        shownav: false,
        showfooter: false
    });
};

// Logout Controller
const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send({ error: 'Logout failed', details: err });
        }
        res.redirect('/login');
    });
};

// Ekspor modul
module.exports = {
    register,
    HalamanRegister,
    Login,
    HalamanLogin,
    logout
};