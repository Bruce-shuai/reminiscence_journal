// controllers 文件夹是为了让 router 更具有可扩展性
import PostMessage from "../models/postMessage.js"

// 对应状态码网址：https://restapitutorial.com/httpstatuscodes.html
export const getPosts = async (req, res) => {
  try {
    const postMessage = await PostMessage.find();

    console.log(postMessage);

    res.status(200).json(postMessage);
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const createPost = async (req, res) => {
  // 把数据全放在请求体里面
  const post = req.body;

  const newPost = new PostMessage(post);
  try {
    await newPost.save(); 

    res.status(201).json(newPost)
  } catch (error) {
    res.status(409).json({ message:error.message })
  }
}