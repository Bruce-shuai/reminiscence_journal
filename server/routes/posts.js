import express from 'express';
import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js';
const router = express.Router();

router.get('/', getPosts)
router.post('/', createPost)
// 修改已经存在的日志信息
router.patch('/:id', updatePost)
router.delete('/:id', deletePost);
router.patch('/:id/likePost', likePost);   // 局部更新的数据用patch请求

export default router;