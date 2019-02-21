import React, {Component} from 'react'
import {connect} from "react-redux"
import {Field, reduxForm} from 'redux-form'
import {required, length} from "redux-form-validators"
import Textarea from 'react-textarea-autosize'

import {addPost} from '../../actions'

import './NewPostForm.css'

class NewPostForm extends Component {
  generateTextarea = ({input, meta: {touched, error}}) =>
      <React.Fragment>
      <Textarea
          className={`textarea ${touched && error && 'error'}`}
          minRows={4}
          maxRows={30}
          value={input.value}
          onChange={event =>
              input.onChange(event.target.value)
          }/>
        {touched && error && <div className="error-message">{error}</div>}
      </React.Fragment>

  render() {
    const {handleSubmit, addPost} = this.props
    return (
        <form className="container"
              onSubmit={handleSubmit(addPost)}>
          <Field
              name="content"
              validate={[
                required({msg: 'Required.'}),
                length({min: 5, msg: 'Minimum 5 characters.'}),
                length({max: 5000, msg: 'Maximum 5000 characters.'})
              ]}
              component={this.generateTextarea}
          />
          <input className="submit" type="submit" value={'Wyślij'}/>
        </form>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  addPost: post => dispatch(addPost(post))
})

NewPostForm = connect(
    null,
    mapDispatchToProps
)(NewPostForm)

export default NewPostForm = reduxForm({
  form: 'newPost',
  destroyOnUnmount: false
})(NewPostForm)