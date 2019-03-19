import React, {Component} from 'react'
import Editor from 'draft-js-plugins-editor';
import {EditorState} from 'draft-js'
import {stateToMarkdown} from 'draft-js-export-markdown'
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createEmojiPlugin from 'draft-js-emoji-plugin'

import {Segment, Button} from 'semantic-ui-react'
import 'draft-js-emoji-plugin/lib/plugin.css';
import 'draft-js-hashtag-plugin/lib/plugin.css';
import 'draft-js-linkify-plugin/lib/plugin.css';
let linkifyPlugin = createLinkifyPlugin({
  target: '_blank',
  rel: 'noopener'
})
const hashtagPlugin = createHashtagPlugin()
const emojiPlugin = createEmojiPlugin()
const {EmojiSuggestions} = emojiPlugin

class PostForm extends Component {
  constructor(props) {
    super(props)
    this.state = {editorState: EditorState.createEmpty()}
  }

  onChange = editorState => {
    return this.setState({editorState})
  }

  render() {
    return (
        <Segment inverted>
          <Editor editorState={this.state.editorState}
                  plugins={[linkifyPlugin, hashtagPlugin, emojiPlugin]}
                  onChange={this.onChange}/>
          <EmojiSuggestions/>
          <Button primary size="small" compact content={'Send'}
                  onClick={() => this.props.onSubmit(
                      stateToMarkdown(this.state.editorState.getCurrentContent()))}/>
          {this.props.cancel
          && <Button secondary onClick={this.props.cancel} content={'Cancel'}/>}
        </Segment>
    )
  }
}

export default PostForm