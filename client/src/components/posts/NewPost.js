import React from 'react'
import NewPostForm from './NewPostForm'
import {addPost} from "../../actions";
import {connect} from "react-redux";

const NewPost = props => {
  const onNewPostSubmit = ({newPost}) => {
    props.addPost(newPost)
  }

  return <NewPostForm onSubmit={onNewPostSubmit} />
}

const mapDispatchToProps = dispatch => ({
  addPost: newPost => dispatch(addPost(newPost)),
})

export default connect(
    null,
    mapDispatchToProps,
)(NewPost)