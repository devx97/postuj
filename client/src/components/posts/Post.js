import React from 'react';
import {connect} from 'react-redux'
import TimeAgo from 'react-timeago'
import polishStrings from 'react-timeago/lib/language-strings/pl'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import {plusPost} from '../../actions'
const formatter = buildFormatter(polishStrings)

const Post = ({post, handleReply, plusPost, postId}) =>
    <div className="postContainer">
        <div className="avatar">
            <img
                src="https://media.giphy.com/media/B1IWXbj4Disow/200.gif"
                alt="avatar"/>
        </div>
        <div className="section-info underline">
            <div className="item nick">{post.author}</div>
            <TimeAgo className="item time" date={post.createdAt}
                     formatter={formatter}/>
            <div className="item plus-count item-right">{post.pluses}</div>
            <button onClick={() => plusPost(postId, post.commentId)} className="item btn-plus">+</button>
        </div>
        <div className="section">
            {post.content}
        </div>
        <button onClick={handleReply}>Reply</button>
    </div>

const mapDispatchToProps = dispatch => ({
  plusPost: (postId, commentId) => dispatch(plusPost(postId, commentId))
})

export default connect(
  null,
  mapDispatchToProps
)(Post)