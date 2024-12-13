const db = require('../configs/db');

// Menampilkan halaman kontak dan semua pesan kontak
const renderContactPage = (req, res) => {
    const sql = 'SELECT * FROM contacts ORDER BY created_at DESC'; 
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching contact messages:', err);
            return res.status(500).send('Error fetching contact messages');
        }
        res.render('contact', {
            layout: 'layouts/main-layout',
            title: 'Contact Us',
            shownav: true,
            showfooter: true,
            contactMessages: results,
        });
    });
};

// Menangani pengiriman formulir kontak
const submitContactForm = (req, res) => {
    const { name, email, message } = req.body;

    const sql = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
    db.query(sql, [name, email, message], (err, result) => {
        if (err) {
            console.error('Error submitting contact form:', err);
            return res.status(500).send('Error submitting contact form');
        }
        res.redirect('/contact'); 
    });
};

// Menampilkan pesan kontak dalam bentuk daftar
const getContactMessages = (req, res) => {
    const query = 'SELECT * FROM contact_messages';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send({ error: 'Database error', details: err });
        }
        res.render('contact', {
            layout: 'layouts/main-layout',  // Corrected layout name
            title: 'Contact Messages',
            messages: results,
            shownav: true,
            showfooter: true,
        });
    });
};

module.exports = {
    renderContactPage,
    submitContactForm,
    getContactMessages,
};
