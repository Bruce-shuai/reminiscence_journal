import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'
import postRoutes from './routes/posts.js';   // node代码路径必须有后缀
import userRoutes from './routes/users.js';   // node代码路径必须有后缀

const app = express();
dotenv.config();
// 中间件  
/**
 * limit: 30mb，即限制req body的最大体积为30mb 
 **/
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors())

/**
 * 路由，并且这个中间件的位置需要放在app.use(cors())后面来达到解决跨域的问题
 */
app.use('/posts', postRoutes);
app.use('/user', userRoutes);

// Mongodb Connect
const PORT = process.env.PORT || 5001;

// 防止报错
mongoose.set('strictQuery', true);

/**
 * useNewUrlParser & useUnifiedTopology 开启是为了使mongoose对弃用的一些内容有兼容性效果
 */
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(error.message))
