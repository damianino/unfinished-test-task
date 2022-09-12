const express = require('express');

const postSignin = require('../controllers/signin');
const postLogin = require('../controllers/login');
const postLogout = require('../controllers/logout');
const {
    getUser,
    putUser,
    deleteUser,
    } = require('../controllers/user');
const {
    postTag,
    getTagId,
    getTag,
    putTagId,
    deleteTagId,
   } = require('../controllers/tag');
const {
    postUserTag,
    deleteUserTagId,
    getUserTagMy,
    } = require('../controllers/user-tag');
const postToken = require('../controllers/token');

const { authenticate } = require('../middlewares/authenticator');
const jwtAuth = require('../middlewares/jwtAuthenticator');
const tokenStore = require('../stores/jwtStore');

const router = express.Router();

router.post('/signin', postSignin);
router.post('/login', authenticate, postLogin);

router.use(jwtAuth);

router.post('/token', postToken);
router.post('/logout', postLogout);
router.get('/user', getUser);
router.put('/user', putUser);
router.delete('/user', deleteUser);
router.post('/tag', postTag);
router.get('/tag/:id', getTagId);
router.get('/tag', getTag);
router.put('/tag/:id', putTagId);
router.delete('/tag/:id', deleteTagId);
router.post('/user/tag', postUserTag);
router.delete('/user/tag/:id', deleteUserTagId);
router.get('/user/tag/my', getUserTagMy);

module.exports.router = router;
