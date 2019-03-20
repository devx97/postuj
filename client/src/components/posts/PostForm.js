import React, {Component} from 'react'

import {Editor} from 'slate-react'
import {Value} from 'slate'
import Plain from 'slate-plain-serializer'
import Prism from '@gitbook/slate-prism'
import EditCode from 'slate-edit-code'
import PasteLinkify from 'slate-paste-linkify'
import MarkdownPlugin from 'slate-md-plugin';
import 'prismjs/themes/prism-dark.css'

import {Segment, Button} from 'semantic-ui-react'

class PostForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      plugins: [
        Prism(),
        // PasteLinkify(),
      ],
      value: Value.fromJSON({
        document: {
          nodes: [
            {
              object: 'block',
              type: 'paragraph',
              nodes: [
                {
                  object: 'text',
                  leaves: [
                    {
                      text: ''
                    },
                  ],
                },
              ],
            },
          ],
        },
      })
    }
  }

  onMarkClick = (event, type) => {
    event.preventDefault()
    this.editor.focus().toggleMark(type)
  }

  renderMark = (props, editor, next) => {
    const {children, mark, attributes} = props

    switch (mark.type) {
      case 'bold':
        return <strong {...attributes}>{children}</strong>
      case 'italic':
        return <em {...attributes}>{children}</em>
      case 'underlined':
        return <u {...attributes}>{children}</u>
      case 'code':
        return <code {...attributes}>{children}</code>
      default:
        return next()
    }
  }

  render() {
    return (
        <Segment inverted>
          <Editor
              ref={editor => this.editor = editor}
              plugins={this.state.plugins}
              value={this.state.value}
              spellCheck={false}
              onChange={({value}) => this.setState({value})}
              renderMark={this.renderMark}
          />
          <Button secondary size="mini" icon={'bold'}
                  onClick={event => this.onMarkClick(event, 'bold')}/>
          <Button secondary size="mini" icon={'italic'}
                  onClick={event => this.onMarkClick(event, 'italic')}/>
          <Button secondary size="mini" icon={'underline'}
                  onClick={event => this.onMarkClick(event, 'underlined')}/>
          <Button secondary size="mini" icon={'code'}
                  onClick={event => this.onMarkClick(event, 'code')}/>
          <Button floated="right" primary size="small" compact content={'Send'}
                  onClick={() => this.props.onSubmit(Plain.serialize(this.state.value))}/>
          {this.props.cancel
          && <Button floated="right" size="small" compact onClick={this.props.cancel}
                     content={'Cancel'}/>}
        </Segment>
    )
  }
}

export default PostForm