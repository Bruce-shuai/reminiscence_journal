import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import useStyles from './styles';
import { deletePost, likePost } from '../../../actions/posts';

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();
  const [likes, setLikes] = useState(post?.likes);

  const userId = user?.result?.googleId || user?.result?._id;
  const hasLikedPost = post.likes.find(like => like === userId);

  const handleLikeClick = async () => {
    dispatch(likePost(post._id)); // 这里不能使用await，避免同步执行代码

    if (hasLikedPost) {
      setLikes(post.likes.filter(id => id !== userId))
    } else {
      setLikes([...post.likes, userId]);
    }
  }

  const Likes = () => {
    if (likes.length > 0) {
      return hasLikedPost
        ? (
          <><ThumbUpAltIcon fontSize='small' />&nbsp;{likes.length}</>
        ) : (
          <><ThumbUpAltOutlined />&nbsp;{likes.length}</>
        )
    }

    return <><ThumbUpAltOutlined fontSize='small' />&nbsp;点赞</>
  }

  const openPost = () => history.push(`/posts/${post._id}`)

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        className={classes.cardActions}
        onClick={openPost}
      >
        <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
        <div className={classes.overlay}>
          <Typography variant='h6'>{post.name}</Typography>
          <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
        </div>
        {
          (user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <div className={classes.overlay2}>
            <Button 
              style={{color: 'white'}} 
              size="small" 
              onClick={() => setCurrentId(post._id)}
            >
              <MoreHorizIcon fontSize='default'/>
            </Button>
          </div> 
          )
        }
        <div className={classes.details}>
          <Typography variant='body2' color={'textSecondary'}>{post.tags.map(tag => `#${tag}`)}</Typography>
        </div>
          <Typography className={classes.title} variant='h5' gutterBottom>{post.title}</Typography>
        <CardContent>
          <Typography variant='body2' color="textSecondary" component="p">{post.message}</Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" disabled={!user?.result} onClick={() => {(handleLikeClick())}}>
          <Likes />
        </Button>

        {
          (user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <Button 
            size="small" 
            color="primary" 
            onClick={() => {
              dispatch(deletePost(post._id))
            }}>
            <DeleteIcon fontSize="small" 
          />
          </Button>
          )
        }
      </CardActions>
    </Card>
  )
}

export default Post;