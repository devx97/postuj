import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Button, Segment} from 'semantic-ui-react'

import TimeAgo from 'react-timeago'
import polishStrings from 'react-timeago/lib/language-strings/pl'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'

import {plusPost, editPost} from '../../actions'
import ReactQuill from 'react-quill'
import hljs from 'highlight.js'

const formatter = buildFormatter(polishStrings)

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
    }
  }

  modules = {
    toolbar: false,
    syntax: {highlight: text => hljs.highlightAuto(text).value},
  }

  handleEditPost = ({content}) => {
    return editPost(content, this.props.postId, this.props.post.commentId)
    .then(() => this.setState({editMode: false}))
  }

  render() {
    const {post, handleReply, plusPost, postId, username} = this.props
    return <div className="postContainer">
      <div className="avatar">
        <img
            src="https://media.giphy.com/media/B1IWXbj4Disow/200.gif"
            alt="avatar"/>
      </div>

      <div className="section-info underline">
        <Link to={`/u/${post.author}`} className="item nick">{post.author}</Link>
        <Link to={`/p/${postId}/${post.commentId ? post.commentId : ''}`}>
          <TimeAgo className="item time" date={post.createdAt} formatter={formatter}/>
        </Link>
        <div className="item plus-count item-right">+{post.pluses}</div>
        {
          username && <Button size="mini" compact color="blue" icon={'plus'} circular
                              onClick={() => plusPost(postId, post.commentId)}/>}
      </div>

      <div>
        <div className="section">
          <ReactQuill
              ref={quill => this.editor = quill && quill.getEditor()}
              modules={this.modules}
              defaultValue={post.content}
              readOnly={true}
          />
        </div>
        {username === post.author
        && <Button secondary compact size="mini"
                   onClick={() => this.setState({editMode: !this.state.editMode})}
                   icon={'edit'}/>}
        {username === post.author
        && <Button secondary compact size="mini" onClick={() => console.log("REMOVE")}
                   icon={'trash'}/>}
        {username && <Button secondary compact size="mini" onClick={handleReply}
                             icon={'reply'}/>}
      </div>
    </div>
  }
}

const mapStateToProps = (state, {postId}) => ({
  username: state.auth.user.username
})

const mapDispatchToProps = dispatch => ({
  plusPost: (postId, commentId) => dispatch(plusPost(postId, commentId)),
  editPost: (content, postId, commentId) => dispatch(editPost(content, postId, commentId))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Post)
