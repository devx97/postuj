import React, {useState} from 'react'
import {connect} from 'react-redux'

import Post from './Post'
import {reply} from '../../actions'
import PostForm from './PostForm'

const Thread = ({post, reply}) => {
  const [replyMode, changeReplyMode] = useState(false)
  const [bestTwo, changeBestTwo] = useState(post.comments.length > 2)

  let comments
  if (post.comments.length > 2 && bestTwo) {
    const bestComments = [...post.comments]
    bestComments.sort((comment, comment2) =>
        comment2.pluses - comment.pluses)
    const bestTwoComments = bestComments.slice(0, 2)
    console.log(bestTwoComments)
    bestTwoComments.sort((comment, comment2) =>
        new Date(comment.createdAt) - new Date(comment2.createdAt)
    )
    comments = bestTwoComments
  } else {
    comments = post.comments
  }

  const handleReply = values => {
    return reply(values)
  }

  return (
      <div className="thread">
        <Post
            key={post.postId}
            handleReply={() => changeReplyMode(true)}
            post={post}
            postId={post.postId}
        />
        <div className="comments">
          {comments.map(comment =>
              <Post
                  key={comment.commentId}
                  handleReply={() => changeReplyMode(!replyMode)}
                  post={comment}
                  postId={post.postId}
              />)}
        </div>
        {post.comments.length > 2 &&
        <div className="show-more" onClick={() => changeBestTwo(!bestTwo)}>
          {post.comments.length > 2 && bestTwo
              ? `Show more comments (${post.comments.length - 2})`
              : `Show 2 best comments`
          }
        </div>
        }
        {
          replyMode &&
          <div className="reply">
            <PostForm submitBtn onSubmit={handleReply} form={`form-postId-${post.postId}`}/>
          </div>
        }
      </div>
  )
}

const mapDispatchToProps = dispatch => ({
  reply: post => dispatch(reply(post))
})

export default connect(
    null,
    mapDispatchToProps
)(Thread)
