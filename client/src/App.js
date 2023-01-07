import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Grow, Grid, Container } from '@material-ui/core';
import { ReactComponent as JournalImg }from './images/journal.svg';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';

import { useDispatch } from 'react-redux';
import { getPosts } from './actions/posts';


import useStyles from './styles';

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch])

  return (
    <Container maxwidth="lg">
      {/* 首页顶部 */}
      <AppBar className={classes.appBar} position='static' color="inherit">
        <Typography className={classes.heading} variant='h2' align="center">我的疫情校园时光</Typography>
        <JournalImg className={classes.image} />
      </AppBar>
      {/* 首页主体内容 */}   
      {/* Grow in 组件的出现会有一定的动态效果 */}
      <Grow in>
        <Container>
          <Grid container className={classes.mainContainer} justifyContent="space-between" alignItems='stretch' spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  )
}

export default App;