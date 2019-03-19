import React, {Component} from 'react';
import {connect} from 'react-redux'
import {EditorState} from 'draft-js'
import Editor from 'draft-js-plugins-editor';
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createMarkdownShortcutsPlugin from 'draft-js-markdown-shortcuts-plugin';
import Prism from 'prismjs'
import PrismDecorator from 'draft-js-prism'
import createPrismPlugin from 'draft-js-prism-plugin';
import {stateFromMarkdown} from 'draft-js-import-markdown'

import TimeAgo from 'react-timeago'
import polishStrings from 'react-timeago/lib/language-strings/pl'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'

import {plusPost, editPost} from '../../actions'

import {Link} from 'react-router-dom'
import {Button} from 'semantic-ui-react'
import 'draft-js-mention-plugin/lib/plugin.css'
import 'draft-js-linkify-plugin/lib/plugin.css'
import 'prismjs/themes/prism-dark.css'

const formatter = buildFormatter(polishStrings)
let linkifyPlugin = createLinkifyPlugin({
  target: '_blank',
  rel: 'noopener'
})
const hashtagPlugin = createHashtagPlugin()
const markdownShortcutsPlugin = createMarkdownShortcutsPlugin()
const prismPlugin = createPrismPlugin({
  // It's required to provide your own instance of Prism
  prism: Prism
})
const prismDecorator = new PrismDecorator({prism: Prism})

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      editorState: EditorState.createWithContent(stateFromMarkdown(this.props.post.content.replace(
          /@([a-zA-Z0-9]+([-_][a-zA-Z0-9]+)*[a-zA-Z0-9])/g,
          // "<a href='/u/$1' target='_blank' rel='noopener'>[@$1](XD.com)</a>"
          "[@$1](xd.com)"
      )))
    }
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
          <Editor
              editorState={this.state.editorState}
              plugins={[linkifyPlugin, hashtagPlugin, markdownShortcutsPlugin, prismPlugin]}
              onChange={editorState => this.setState({editorState})}
              readOnly={!this.state.editMode}
              decorators={[prismDecorator]}
          />
          {/*<Linkify>*/}
          {/*{post.content.replace(*/}
          {/*/@([a-zA-Z0-9]+([-_][a-zA-Z0-9]+)*[a-zA-Z0-9])/g,*/}
          {/*"<a href='/u/$1' target='_blank' rel='noopener'>@$1</a>"*/}
          {/*)}*/}
          {/*</Linkify>*/}
        </div>
        {username === post.author
        && <Button secondary compact size="mini" onClick={() => this.setState({editMode: !this.state.editMode})}
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
