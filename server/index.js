import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';   // node代码路径必须有后缀

const app = express();

// 中间件  
/**
 * 路由
 */
app.use('/posts', postRoutes);

/**
 * limit: 30mb，即限制req body的最大体积为30mb 
 **/
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors())

// Mongodb Connect
const CONNECTION_URL = 'mongodb+srv://jianghaosong:jianghaosong@cluster0.ihfbaaq.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5001;

// 防止报错
mongoose.set('strictQuery', true);

/**
 * useNewUrlParser & useUnifiedTopology 开启是为了使mongoose对弃用的一些内容有兼容性效果
 */
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(error.message))
