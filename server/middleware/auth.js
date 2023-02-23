import jwt from 'jsonwebtoken';

// 点击提交按钮 => auth middleware 进行鉴权 => 鉴权成功就进入controller

const auth = async (req, res, next) => {

  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, 'test');
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }
    next();
  } catch (error) {
    console.error(error);
  }
}

export default auth;