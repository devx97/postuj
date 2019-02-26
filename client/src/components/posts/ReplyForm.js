import React, {Component} from 'react'
import {connect} from "react-redux"
import {Field, reduxForm} from 'redux-form'
import {required, length} from "redux-form-validators"
import Textarea from 'react-textarea-autosize'

import {reply} from '../../actions'

class ReplyForm extends Component {
  handleReply = values => {
    this.props.reply(values, this.props.postId)
  }

  generateTextarea = ({input, meta: {touched, error}}) =>
      <React.Fragment>
      <Textarea
          className={`textarea ${touched && error && 'error'}`}
          minRows={2}
          maxRows={30}
          value={input.value}
          onChange={event =>
              input.onChange(event.target.value)
          }/>
        {touched && error && <div className="error-message">{error}</div>}
      </React.Fragment>

  render() {
    const {handleSubmit} = this.props
    return (
        <form className="container"
              onSubmit={handleSubmit(this.handleReply)}>
          <Field
              name="content"
              validate={[
                required({msg: 'Required.'}),
                length({min: 5, msg: 'Minimum 5 characters.'}),
                length({max: 2000, msg: 'Maximum 5000 characters.'})
              ]}
              component={this.generateTextarea}
          />
          <input className="submit" type="submit" value={'Wyślij'}/>
        </form>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  reply: (post, postId) => dispatch(reply(post, postId))
})

ReplyForm = connect(
    null,
    mapDispatchToProps
)(ReplyForm)

export default ReplyForm = reduxForm({
  form: 'reply',
  destroyOnUnmount: false
})(ReplyForm)