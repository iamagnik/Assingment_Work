const { Router } = require('express');
const { signupHandler, loginHandler, logoutHandler } = require('../controller/user');

const router = Router();

router.post('/signup', signupHandler);
router.post('/login', loginHandler);
router.post('/logout', logoutHandler);

module.exports = router;
