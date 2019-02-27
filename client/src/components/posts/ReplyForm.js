import React, {Component} from 'react'
import {connect} from "react-redux"
import {Field, reduxForm} from 'redux-form'
import {required, length} from "redux-form-validators"
import Textarea from 'react-textarea-autosize'

import {reply} from '../../actions'

class ReplyForm extends Component {
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
    const {handleSubmit, reply} = this.props
    console.log(this.props.initialValues)
    return (
        <form className="container"
              onSubmit={handleSubmit(reply)}>
          <Field
              name="content"
              validate={[
                required({msg: 'Required.'}),
                length({min: 5, msg: 'Minimum 5 characters.'}),
                length({max: 2000, msg: 'Maximum 5000 characters.'})
              ]}
              component={this.generateTextarea}
          />
          <Field name="postId" type="hidden" component="input"/>
          <input className="submit" type="submit" value={'Send'}/>
        </form>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  initialValues: {postId: ownProps.postId}
})

const mapDispatchToProps = dispatch => ({
  reply: post => dispatch(reply(post))
})

ReplyForm = reduxForm({
  enableReinitialize: true,
  destroyOnUnmount: false
})(ReplyForm)

export default ReplyForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(ReplyForm)