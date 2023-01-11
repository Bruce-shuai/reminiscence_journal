import express from 'express';
import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js';
import auth from '../middleware/auth.js';


const router = express.Router();

router.get('/', getPosts);
// 增删改日志都需要先鉴权，鉴权就用到了中间件了~
// 创建日志
router.post('/', auth, createPost);
// 修改已经存在的日志信息
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);   // 局部更新的数据用patch请求

export default router;