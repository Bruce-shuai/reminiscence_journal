import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { ReactComponent as JournalImg }from '../../images/journal.svg';
import { AppBar, Avatar, Toolbar, Typography, Button } from '@material-ui/core';
import useStyles from './styles';
import { googleLogout } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';


const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  // 退出登录
  const logout = () => {
    // 这里的dispatch 是为了删除掉浏览器里的localStorage的数据
    dispatch({ type: 'LOGOUT'});
    // 这个history 会导致 路径发生变化，Whenever the URL changes, a new location object will be returned.会导致useEffect的执行
    history.push('/');
    setUser(null);
    googleLogout();
  }
  useEffect(() => {
    const token = user?.token;

    // 检测token是否过期
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])
  return (
    <AppBar className={classes.appBar} position='static' color="inherit">
      <div className={classes.brandContainer}>
        <Typography component={Link} to="/" className={classes.heading} variant='h2' align="center">我的疫情校园时光</Typography>
        <JournalImg className={classes.image} />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.result?.name} src={user.result?.picture}>{user.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>退出登录</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant='contained' color="primary">登录</Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar;