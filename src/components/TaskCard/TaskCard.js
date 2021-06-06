import React, { useEffect } from 'react';
import Card from '@material-ui/core/Card';
import {CardHeader, CardMedia, CardContent,
  CardActions, Collapse, Avatar, IconButton,
  Typography, Button, TextField, Menu,
  MenuItem,
} from '@material-ui/core';
import { Chat, MoreVert } from '@material-ui/icons';
import CustomeSelect from 'components/CustomeSelect';
import { todo_status } from 'utils/constants';
import { getInitials } from 'utils/helpers';
import useStyles from './styles';
import Comments from 'components/Comments';
import clsx from 'clsx';


function RecipeReviewCard(props) {
  const { user: creator, type, data, users,
    updatedAt, deleteTask, _id, assignedUser, status,
    createComment, loadComments, editTask, deleted
  } = props;
  
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [comment, setComment] = React.useState('');
  const [comments, setComments] = React.useState([]);
  const [anchor, setAnchor] = React.useState(null);
  const [stateStatus, setStatus] = React.useState('');
  const [user, setUser] = React.useState('');
  
  useEffect(() => {
    if (user === '' && assignedUser) setUser(assignedUser._id);
    if (stateStatus === '' && status) setStatus(status);
  },[user, setUser, assignedUser, setStatus, status, stateStatus]);

  if(Object.keys(props).length === 0) return null;
  
  const handleExpandClick = async () => {
    if (!expanded) {
      const data = await loadComments(_id);
      setComments(data);
    }
    setExpanded(!expanded);
  };


  const handleClose = () => setAnchor(null);
  const handleComment = e => setComment(e.target.value);
  const handleClick = e => setAnchor(e.currentTarget);
  const changeUser = e => {
    const value = e.target.value;
    setUser(value);
    editTask({
      _id,
      status,
      assignedUser: value
    });
  }
  const changeStatus = (e) => {
    const value = e.target.value;
    setStatus(value);
    editTask({
      _id,
      status: value,
      assignedUser
    })
  };
  const closeMenu = () => {
    deleteTask({_id})
    handleClose();
  }
  const submitComment = async () => {
    const TOKEN = localStorage.getItem('TOKEN');
    const { user } = JSON.parse(TOKEN);
    await createComment({ user: user._id, data: comment, task: _id })
    const data = await loadComments(_id);
    setComments(data);
  }


  return (
    <Card className={classes.root}>
      <Menu
        id="simple-menu"
        anchorEl={anchor}
        keepMounted
        open={Boolean(anchor)}
        onClose={handleClose}
      >
        <MenuItem onClick={closeMenu}>Delete</MenuItem>
      </Menu>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {getInitials(creator.name)}
          </Avatar>
        }
        action={
          !deleted ? (
            <IconButton aria-label="settings" onClick={handleClick}>
            <MoreVert />
          </IconButton>
          ): null
        }
        title={creator.name}
        subheader={new Date(updatedAt).toLocaleString()}
      />
      {
        type === "Video" ?
        <CardMedia component="iframe" autoPlay={false} src={data}/> : 
        type === "Image" ?
        <CardMedia className={classes.media} image={data} />:
        <Typography variant="h3" style={{ textAlign: 'center' }}>{data}</Typography>
      }
      <CardContent>
        <CustomeSelect 
          value={stateStatus} 
          label="Status" 
          disabled={deleted}
          className={classes.input}
          options={!deleted ?todo_status : [{ label: stateStatus, value: stateStatus}]}
          onChange={changeStatus} />
        <CustomeSelect 
          value={user} 
          disabled={deleted}
          label="Assigned User" 
          className={classes.input}
          options={!deleted ?users.data : [{ label: assignedUser.name, value: assignedUser._id}]}
          onChange={changeUser} />
        { deleted && <Typography style={{ color: 'red' }} variant='subtitle1'>Deleted</Typography>}
      </CardContent>
      <CardActions disableSpacing>
        <IconButton 
          onClick={handleExpandClick}
          aria-label="Comment">
          <Chat />
          <Typography variant="subtitle1">Comments</Typography>
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <TextField className={classes.input} fullWidth label="Comment" value={comment} onChange={handleComment} variant="outlined" size="small" />
          <Button onClick={submitComment} className={clsx(classes.input, classes.spaceBottom)} fullWidth variant="contained" size="small" color="primary">Comment</Button>
          {
            comments && comments.map(i => <Comments {...i} key={i._id} />)
          }
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default RecipeReviewCard;