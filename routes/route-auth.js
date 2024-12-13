const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller-auth');
const { isAuthenticated } = require('../middleware/middleware-auth');

router.get('/register', controller.HalamanRegister);
router.post('/register', controller.register);
router.get('/login', controller.HalamanLogin);
router.post('/login', controller.Login);
router.get('/logout', controller.logout);

router.get('/', isAuthenticated, (req, res) => {
    res.render('index', {
        title: 'Home',
        layout: 'layouts/main-layout',
        shownav: true,
        showfooter: true
    });
});

module.exports = router;