import React, {Component} from 'react'
import {Field} from 'react-final-form'
import {required, length} from "redux-form-validators"
import Textarea from 'react-textarea-autosize'
import {Editor, EditorState} from 'draft-js'

import {Form} from 'react-final-form'
import {Segment, Form as SUIForm, Button} from 'semantic-ui-react'
import {composeValidators} from '../../helpers/customValidators'

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
  }

  generateTextarea = ({input, meta: {touched, error}}) =>
      <React.Fragment>
      {/*<Textarea*/}
          {/*minRows={3}*/}
          {/*autoFocus*/}
          {/*maxRows={30}*/}
          {/*{...input}*/}
      {/*/>*/}
        {touched && error && <div className="error-message">{error}</div>}
      </React.Fragment>

  render() {
    return (
        <Segment inverted>
          <Editor editorState={this.state.editorState} onChange={this.onChange} />
          <Form
              onSubmit={this.props.handleSubmit}
              render={({handleSubmit}) =>
                  <SUIForm onSubmit={handleSubmit}>
                    <Field
                        name="content"
                        validate={composeValidators(
                            required({msg: 'Required.'}),
                            length({min: 5, msg: 'Minimum 5 characters.'}),
                            length({max: 5000, msg: 'Maximum 5000 characters.'})
                        )}
                        component={this.generateTextarea}
                    />
                    {this.props.submitBtn && <Button primary type="submit" content={'Send'}/>}
                    {this.props.cancel && <Button secondary onClick={this.props.cancel}
                                                  value={'Cancel'}>Cancel</Button>}
                  </SUIForm>}
          />
        </Segment>
    )
  }
}

export default PostForm