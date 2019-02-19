import React, {Component} from 'react';
import './NewPost.css'
import Textarea from 'react-textarea-autosize'
import {Field, reduxForm} from 'redux-form'
import {required, length} from "redux-form-validators";

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
        {touched && error && <div>{error}</div>}
      </React.Fragment>

  render() {
    return (
        <form className="container" onSubmit={this.props.handleSubmit}>
          <Field
              htmlFor="newPost"
              name="newPost"
              validate={[
                required({msg: 'Required.'}),
                length({min: 5, msg: 'Minimum 5 characters.'}),
                length({max: 5000, msg: 'Maximum 5000 characters.'})
              ]}
              component={this.generateTextarea}
          />
          <input className="submit" type="submit" value={'Wyślij'}/>
        </form>
    );
  }
}

export default NewPostForm = reduxForm({
  form: 'newPost',
  destroyOnUnmount: false
})(NewPostForm)