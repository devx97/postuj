import React, {useState} from 'react'

import Post from './Post'
import ReplyForm from './ReplyForm'

const Thread = ({post}) => {
  const [reply, changeReply] = useState(false)

  const handleReply = event => {
    changeReply(!reply)
  }

  return (
      <React.Fragment>
        <Post
            handleReply={handleReply}
            author={post.author}
            createdAt={post.createdAt}
            plusses={post.pluses}
            content={post.content}
        />
        <div className="comments">
          {post.comments.map(comment =>
              <Post
                  handleReply={handleReply}
                  commentId={post.commentId}
                  author={comment.author}
                  createdAt={comment.createdAt}
                  plusses={comment.pluses}
                  content={comment.content}
              />)}
        </div>
        {
          reply &&
          <div className="reply">
            <ReplyForm form={`form-postId-${post.postId}`} postId={post.postId}/>
          </div>
        }
      </React.Fragment>
  )
}

export default Thread;
