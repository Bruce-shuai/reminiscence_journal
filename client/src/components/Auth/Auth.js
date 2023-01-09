import React, { useState } from 'react'
import { Avatar, Paper, Grid, Typography, Container, Button, Icon } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import useStyles from './styles';
import Input from './Input';
import { useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';

// Google Auth
import { GoogleLogin, googleLogout } from '@react-oauth/google';
// 用来解析 Google登录 返回的token值
import jwt_decode from "jwt-decode";

const Auth = () => {
  const classes = useStyles();
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);

  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();


  const handleSubmit = () => {

  }

  const handleChange = () => {

  }

  const switchMode = () => {
    setIsSignup(prev => !prev);
    handleShowPassword(false);
  }

  const googleSuccess = async (res) => {
    const result = jwt_decode(res?.credential);
    try {
      dispatch({ type: 'AUTH', data: {result} });
      history.push('/')
    } catch (error) {
      console.error(error);
    }
  }
  const googleFailure = (error) => {
    console.log(error);
  }

  const handleShowPassword = () => setShowPassword(prev => !prev)
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>{isSignup ? "注册" : "登录"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input name="name" label="姓名" handleChange={handleChange} autoFocus xs={6}/>
              </>
            )}
            <Input name="email" label="邮箱" handleChange={handleChange} type="email" />
            <Input name="password" label="密码" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
            { isSignup && <Input name="confirmPassword" label="重复密码" handleChange={handleChange} type="password" />}
          </Grid>
          <Button type="submit" fullWidth variant='contained' color="primary" className={classes.submit}>
            {isSignup ? "注册" : "登录"}
          </Button>
          <GoogleLogin 
            onSuccess={googleSuccess}
            onFailure={googleFailure}
          />
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? "你是否已有账号？登录！" : "没有账号？注册！"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>       
    </Container>
  )
}

export default Auth