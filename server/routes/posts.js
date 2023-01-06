import express from 'express';
import { getPosts, createPost, updatePost } from '../controllers/posts.js';
const router = express.Router();

router.get('/', getPosts)
router.post('/', createPost)
// 修改已经存在的日志信息
router.patch('/:id', updatePost)


export default router;