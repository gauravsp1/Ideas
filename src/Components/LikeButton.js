import React from 'react'
import { connect } from "react-redux"
import { likePost } from "../Redux/Actions/DataAction"
import { unlikePost } from "../Redux/Actions/DataAction"

//Material UI
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';


// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';


const useStyles = makeStyles({
  likesButton: {
        // position: 'absolute',
        right: '10%',
        // top: '5%'
      }
})

function LikeButton(props) {
  const classes = useStyles();

  function  likedPost(){
        if (
          props.user.likes &&
          props.user.likes.find(
            (like) => like.postId === props.postId
          )
        )
          return true;
        else return false;
      };

    function  likePost(){
        props.likePost(props.postId);
      };
    function  unlikePost(){
        props.unlikePost(props.postId);
      };

    const likeButton= likedPost()?(
        <Tooltip title="Undo like" placement="top" className={classes.likesButton}>
                <IconButton onClick={unlikePost} className="button">
                <FavoriteIcon color="primary" />
                </IconButton>
            </Tooltip>
    ):(
        <Tooltip title="Like" placement="top" className={classes.likesButton}>
                <IconButton onClick={likePost} className="button">
                <FavoriteBorder color="primary" />
                </IconButton>
            </Tooltip>
    )

    return (
        <>
            {likeButton}
        </>
    )
}

function  mapStateToProps(state) {
    return {
        user: state.user,
        UI: state.UI
    }
}
function  mapDispatchToProps(dispatch) {
    return {
        likePost:(postId)=>{dispatch(likePost(postId))},
        unlikePost:(postId)=>{dispatch(unlikePost(postId))}
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(LikeButton);