import express from 'express'
import { addPost, getPosts, deletePost, updatePost, getUserPosts } from '../controllers/postsController.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

//Get all posts route
router.get('/', getPosts);

//Get user post route
router.get('/user', auth, getUserPosts);

//Add new post route
router.post('/', auth, addPost);

//Delete post route
router.delete('/:id', auth, deletePost);

//Update post route
router.put('/:id', auth, updatePost);

export { router as postsRoutes };