import React, {Component} from 'react'

import 'quill-mentions'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-light.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'

import {Segment, Button, Container, Dropdown} from 'semantic-ui-react'

class PostForm extends Component {
  modules = {
    toolbar: false,
    syntax: {highlight: text => hljs.highlightAuto(text).value},
  }

  onMarkClick = (event, type) => {
    event.preventDefault()
    this.editor.format(type, !this.editor.getFormat()[type])
  }

  insertLenny = event => {
    event.preventDefault()
    this.editor.focus()
    this.editor.insertText(this.editor.getSelection().index, event.target.innerText)
  }

  render() {
    return (
        <Segment inverted>
          <ReactQuill
              ref={quill => this.editor = quill && quill.getEditor()}
              modules={this.modules}
          />

          <Container style={{paddingTop: '5px'}}>
            <Button secondary size="mini" icon={'bold'}
                    onClick={event => this.onMarkClick(event, 'bold')}/>
            <Button secondary size="mini" icon={'italic'}
                    onClick={event => this.onMarkClick(event, 'italic')}/>
            <Button secondary size="mini" icon={'underline'}
                    onClick={event => this.onMarkClick(event, 'underline')}/>
            <Button secondary size="mini" icon={'code'}
                    onClick={event => this.onMarkClick(event, 'code-block')}/>
            <Button secondary size="mini" icon={'linkify'}
                    onClick={event => this.onMarkClick(event, 'link')}/>
            <Dropdown text="( ͡° ͜ʖ ͡°)">
              <Dropdown.Menu>
                <Dropdown.Item text={"( ͡° ͜ʖ ͡°)"} onClick={this.insertLenny}/>
                <Dropdown.Item text={"( ͡° ʖ̯ ͡°)"} onClick={this.insertLenny}/>
                <Dropdown.Item text={"( ͡~ ͜ʖ ͡°)"} onClick={this.insertLenny}/>
                <Dropdown.Item text={"( ͡◉ ͜ʖ ͡◉)"} onClick={this.insertLenny}/>
                <Dropdown.Item text={"( ͡☉ ͜ʖ ͡☉)"} onClick={this.insertLenny}/>
              </Dropdown.Menu>
            </Dropdown>

            <Button floated="right" primary size="mini" content={'Send'}
                    onClick={() => this.props.onSubmit(this.editor.getContents())}/>
            {this.props.cancel
            && <Button floated="right" size="small" compact onClick={this.props.cancel}
                       content={'Cancel'}/>}
          </Container>
        </Segment>
    )
  }
}

export default PostForm