// controllers 文件夹是为了让 router 更具有可扩展性
import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js"

// 对应状态码网址：https://restapitutorial.com/httpstatuscodes.html
export const getPosts = async (req, res) => {
  try {
    const postMessage = await PostMessage.find();

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

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message:error.message })
  }
}

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;   // 是截取路由 :id 的信息
  const post = req.body;

  // 排除无效id页面显示内容的情况
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that id");
  const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, {new: true})
  res.json(updatedPost);
}

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that id");

  await PostMessage.findByIdAndRemove(_id);

  res.json({ message: 'Post deleted successfully!'})
}

export const likePost = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that id");
  const post = await PostMessage.findById(_id);
  const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true })

  res.json(updatedPost);
}