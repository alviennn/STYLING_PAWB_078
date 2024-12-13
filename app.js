const express = require('express');
const session = require('express-session');
const auth = require('./routes/route-auth'); 
const todos = require('./routes/route-todos');
const contact = require('./routes/route-contact');
const path = require('path');

const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine
app.set('view engine', 'ejs');
app.use(require('express-ejs-layouts'));
app.set('layout', 'layouts/main-layout');

// Session middleware
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}));

// Routes
app.use('/', auth);  
app.use('/todos', todos);  
app.use('/contact', contact);  

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
