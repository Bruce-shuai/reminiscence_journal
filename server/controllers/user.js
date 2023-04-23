import bcrypt from 'bcryptjs';  // 使用bcrypt来对用户密码进行hash加密
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

export const signIn = async (req, res) => {
  // 在请求体中获取登录信息
  const { email, password } = req.body;
  
  try {
   // 验证用户是否存在
   const existingUser = await User.findOne({ email });
   if (!existingUser) return res.status(404).json({ message: "用户不存在！"});

   // 验证密码是否正确
   const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

   if (!isPasswordCorrect) return res.status(400).json({ message: "无效凭据！"});

   // 将用户信息token化
   const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', {expiresIn: '1h'});
   console.log('token', token)
   res.status(200).json({ result: existingUser, token });
  } catch (error) {
   res.status(500).json({ message: '服务器出现一些错误'});
  }
}

export const signUp = async (req, res) => {
  const {email, password, confirmPassword, name} = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) return res.status(400).json({message: '用户已经存在！'});

    if (password !== confirmPassword) return res.status(400).json({message: "两次输入的密码不一致！"});

    // 对密码进行hash加密，第二参数表示hash的长度
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({ email, password: hashedPassword, name});
    // 将数据token化
    const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: '1h' })
    // TODO: result 为什么要返回？
    res.status(200).json({result, token});
  } catch (error) {
    res.status(500).json({message: '服务器出现一些错误'});
  }
}