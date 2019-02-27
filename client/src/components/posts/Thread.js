import React, {useState} from 'react'

import Post from './Post'
import ReplyForm from './ReplyForm'

const Thread = ({post}) => {
  const [reply, changeReply] = useState(false)
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

  return (
      <div className="thread">
        <Post
            key={post.postId}
            handleReply={() => changeReply(true)}
            post={post}
            postId={post.postId}
        />
        <div className="comments">
          {comments.map(comment =>
              <Post
                  key={comment.commentId}
                  handleReply={() => changeReply(!reply)}
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
          reply &&
          <div className="reply">
            <ReplyForm form={`form-postId-${post.postId}`} postId={post.postId}/>
          </div>
        }
      </div>
  )
}

export default Thread;
