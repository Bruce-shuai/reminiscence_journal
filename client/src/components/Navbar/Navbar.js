import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as JournalImg }from '../../images/journal.svg';
import { AppBar, Avatar, Toolbar, Typography, Button } from '@material-ui/core';
import useStyles from './styles';
const Navbar = () => {
  const classes = useStyles();

  const user = null;

  return (
    <AppBar className={classes.appBar} position='static' color="inherit">
      <div className={classes.brandContainer}>
        <Typography component={Link} to="/" className={classes.heading} variant='h2' align="center">我的疫情校园时光</Typography>
        <JournalImg className={classes.image} />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="6">{user.result.name}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary">退出登录</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant='contained' color="primary">登录</Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar;