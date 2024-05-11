const express = require('express');
const requireAuth = require ('../middlewares/requireAuth');

const { getAllPost, createPost} = require ('../controllers/post');

const app = express.Router();

app.route('/').get(getAllPost).post(createPost);
app.use(requireAuth);


module.exports = app;