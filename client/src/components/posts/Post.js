import React, {useState} from 'react';
import {connect} from 'react-redux'
import {change, formValueSelector} from 'redux-form'
import Linkify from 'react-linkify'

import TimeAgo from 'react-timeago'
import polishStrings from 'react-timeago/lib/language-strings/pl'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'

import {plusPost, editPost} from '../../actions'

import PostForm from './PostForm'
import {Link} from 'react-router-dom'

const formatter = buildFormatter(polishStrings)

const Post = ({post, handleReply, change, plusPost, postId, username, replyContent, editPost}) => {
  const [editMode, changeEditMode] = useState(false)

  const handleEditPost = ({content}) => {
    return editPost(content, postId, post.commentId)
    .then(() => changeEditMode(false))
  }

  const handleReplyMode = () => {
    handleReply()
    change(`form-p-${postId}`, 'content', (replyContent || "") + `@${post.author}: `)
  }

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
        username && <button onClick={() => plusPost(postId, post.commentId)}
                            className="item btn-plus">+</button>}
    </div>
    {editMode ?
        <div>
          <PostForm submitBtn
                    cancel={() => changeEditMode(false)}
                    initialValues={{content: post.content}}
                    onSubmit={handleEditPost}
                    form={`edit-p${postId}-c${post.commentId || 0}`}
          />
        </div>
        :
        <div>
          <div className="section">
            <Linkify>
              {post.content.replace(
                  /@([a-zA-Z0-9]+([-_][a-zA-Z0-9]+)*[a-zA-Z0-9])/g,
                  "<a href='/u/$1' target='_blank'>@$1</a>"
              )}
            </Linkify>
          </div>
          {username === post.author
          && <button onClick={() => changeEditMode(true)}>Edit</button>}
          {username === post.author
          && <button onClick={() => console.log("REMOVE")}>Remove</button>}
          {username && <button onClick={handleReplyMode}>Reply</button>}
        </div>}
  </div>
}

const mapStateToProps = (state, {postId}) => {
  const selector = formValueSelector(`form-p-${postId}`)
  return {
    username: state.auth.user.username,
    replyContent: selector(state, 'content')
  }
}

const mapDispatchToProps = dispatch => ({
  change: (form, field, value) => dispatch(change(form, field, value)),
  plusPost: (postId, commentId) => dispatch(plusPost(postId, commentId)),
  editPost: (content, postId, commentId) => dispatch(editPost(content, postId, commentId))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Post)
