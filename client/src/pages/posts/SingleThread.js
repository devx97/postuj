import React, {Component} from 'react'
import {connect} from 'react-redux'

import {fetchPost, plusPost} from "../../actions"
// import './Blog.css'
import Thread from '../../components/posts/Thread'

class SingleThread extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reply: false
    }
  }

  async componentDidMount() {
    const postId = parseInt(this.props.match.params.postId)
    this.props.fetchPost(postId)
  }

  render() {
    return (
        <React.Fragment>
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
  fetchPost: postId => dispatch(fetchPost(postId)),
  plusPost: postId => dispatch(plusPost(postId))
})

export default SingleThread = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SingleThread)