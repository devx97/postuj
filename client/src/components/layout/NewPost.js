import React, {useState} from 'react';
import axios from 'axios'
import {connect} from "react-redux";
import {addPost} from "../../actions";
import './NewPost.css'
import Textarea from 'react-textarea-autosize'

const NewPost = props => {
  const [content, setPostContent] = useState('')
  const onFormSubmit = async event => {
    event.preventDefault()
    console.log();
    try {
      const result = await axios.post(
          'http://localhost:5000/api/post/new', {
            content,
            author: props.user.name
          })
      props.addPost(result.data)
      setPostContent('')
    } catch (err) {
      console.log(err.response.data.errors)
    }
  }

  return (
      <form className="container" onSubmit={onFormSubmit}>
        <Textarea
            className={'textarea'}
            name="content"
            value={content}
            minRows={4}
            maxRows={30}
            onChange={e => setPostContent(e.target.value)}
        />
        <input className="submit" type="submit" value={'Wyślij'}/>
      </form>
  );
}

const mapStateToProps = state => ({
  user: state.auth.user
})

const mapDispatchToProps = dispatch => ({
  addPost: post => dispatch(addPost(post))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(NewPost)