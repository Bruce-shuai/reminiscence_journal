import React, { useState } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';

// redux 操作
import { useDispatch } from 'react-redux';
import { createPost } from '../../actions/posts';
// 将文件转化为base64的组件
import FileBase from 'react-file-base64';

import useStyles from './styles';
const Form = () => {
  const classes = useStyles();

  const [postData, setPostData] = useState({
    creator: '',
    title: '',
    message: '',
    tags: '',
  })
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createPost(postData));
    setPostData({
      creator: '',
      title: '',
      message: '',
      tags: '',
    })
  }

  const clear = () => {
    setPostData({
      creator: '',
      title: '',
      message: '',
      tags: '',
    })
  }

  return (
    <Paper className={classes.paper}>
      {/* noValidate 表示不需要验证表单,例如邮箱input，不会去鉴定是否输入的是邮箱格式 autoComplete 表示input框不能被浏览器默认填写 */}
      <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">创建一个日志</Typography>
        <TextField 
          name="creator" 
          variant="outlined" 
          label="创作者" 
          fullWidth 
          value={postData.creator}
          onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
        />
        <TextField 
          name="title" 
          variant="outlined" 
          label="标题" 
          fullWidth 
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField 
          name="message" 
          variant="outlined" 
          label="内容" 
          fullWidth 
          value={postData.message}
          onChange={(e) => setPostData({ ...postData, message: e.target.value })}
        />
        <TextField 
          name="tags" 
          variant="outlined" 
          label="标签" 
          fullWidth 
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
        />
        <div className={classes.fileInput}>
          <FileBase 
            type="file"
            multiple={false}
            onDone={({base64}) => setPostData({...postData, selectedFile: base64})}
          />
        </div>

        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type='submit' fullWidth>确定</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>清除</Button>
      </form>
    </Paper>
  )
}

export default Form;