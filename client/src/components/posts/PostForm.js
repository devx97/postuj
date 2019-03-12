import React, {Component} from 'react'
import {Field} from 'react-final-form'
import {required, length} from "redux-form-validators"
import Textarea from 'react-textarea-autosize'

import {Segment} from 'semantic-ui-react'

class PostForm extends Component {
  generateTextarea = ({input, meta: {touched, error}}) =>
      <React.Fragment>
      <Textarea
          className={`textarea ${touched && error && 'error'}`}
          minRows={3}
          autoFocus
          maxRows={30}
          value={input.value}
          onChange={event => input.onChange(event.target.value)}
      />
        {touched && error && <div className="error-message">{error}</div>}
      </React.Fragment>

  render() {
    return (
        <Segment inverted>
          <form className="container"
                onSubmit={this.props.handleSubmit}>
            <Field
                name="content"
                validate={[
                  required({msg: 'Required.'}),
                  length({min: 5, msg: 'Minimum 5 characters.'}),
                  length({max: 5000, msg: 'Maximum 5000 characters.'})
                ]}
                component={this.generateTextarea}
            />
            {this.props.submitBtn && <input className="submit" type="submit" value={'Send'}/>}
            {this.props.cancel && <button className="submit" onClick={this.props.cancel}
                                          value={'Cancel'}>Cancel</button>}
          </form>
        </Segment>
    )
  }
}

export default PostForm