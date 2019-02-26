import React from 'react';
import {connect} from 'react-redux'
import TimeAgo from 'react-timeago'
import polishStrings from 'react-timeago/lib/language-strings/pl'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import {plusPost} from '../../actions'
const formatter = buildFormatter(polishStrings)

const Post = props =>
    <div key={props.postId || props.commentId} className="postContainer">
        <div className="avatar">
            <img
                src="https://media.giphy.com/media/B1IWXbj4Disow/200.gif"
                alt="avatar"/>
        </div>
        <div className="section-info underline">
            <div className="item nick">{props.author}</div>
            <TimeAgo className="item time" date={props.createdAt}
                     formatter={formatter}/>
            <div className="item plus-count item-right">{props.plusses}</div>
            <button onClick={() => props.plusPost(props.postId)} className="item btn-plus">+</button>
        </div>
        <div className="section">
            {props.content}
        </div>
        <button onClick={props.handleReply}>Reply</button>
    </div>

const mapDispatchToProps = dispatch => ({
  plusPost: postId => dispatch(plusPost(postId))
})

export default connect(
  null,
  mapDispatchToProps
)(Post)