import React, {Component} from 'react'
import {connect} from 'react-redux'

import PostForm from "../../components/posts/PostForm"
import {addPost, fetchPosts, plusPost} from "../../actions"
import './Blog.css'
import Thread from '../../components/posts/Thread'

class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reply: false
    }
  }

  async componentDidMount() {
    this.props.fetchPosts()
  }

  render() {
    return (
        <React.Fragment>
          {this.props.isLogged && <PostForm onSubmit={this.props.addPost}/>}
          {this.props.posts.map(post => <Thread key={post.postId} post={post}/>)}
        </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.posts,
  isLogged: state.auth.isLogged
})

const mapDispatchToProps = dispatch => ({
  addPost: post => dispatch(addPost(post)),
  fetchPosts: posts => dispatch(fetchPosts(posts)),
  plusPost: postId => dispatch(plusPost(postId))
})

export default Blog = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Blog)