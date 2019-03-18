import React, {useState} from 'react'
import {connect} from 'react-redux'

import Post from './Post'
import {reply} from '../../actions'
import PostForm from './PostForm'
import {Container, Segment} from 'semantic-ui-react'

const Thread = ({post, reply}) => {
  const [replyMode, setReplyMode] = useState(false)
  const [bestTwo, changeBestTwo] = useState(post.comments.length > 2)

  let comments
  if (post.comments.length > 2 && bestTwo) {
    const bestComments = [...post.comments]
    bestComments.sort((comment, comment2) =>
        comment2.pluses - comment.pluses)
    const bestTwoComments = bestComments.slice(0, 2)
    bestTwoComments.sort((comment, comment2) =>
        new Date(comment.createdAt) - new Date(comment2.createdAt)
    )
    comments = bestTwoComments
  } else {
    comments = post.comments
  }

  const handleReply = ({content}) => {
    return reply(post.postId, content)
  }

  return (
      <Segment inverted style={{padding: '7px'}}>
        <Post
            key={post.postId}
            handleReply={() => setReplyMode(true)}
            post={post}
            postId={post.postId}
        />
        <Container style={{paddingLeft: '35px'}}>
          {comments.map(comment =>
              <Post
                  key={comment.commentId}
                  handleReply={() => setReplyMode(true)}
                  post={comment}
                  postId={post.postId}
              />)}
        </Container>
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
            <PostForm cancel={() => setReplyMode(false)}
                      submitBtn onSubmit={handleReply}
                      form={`form-p-${post.postId}`}
            />
          </div>
        }
      </Segment>
  )
}

const mapDispatchToProps = dispatch => ({
  reply: (postId, content) => dispatch(reply(postId, content))
})

export default connect(
    null,
    mapDispatchToProps
)(Thread)
