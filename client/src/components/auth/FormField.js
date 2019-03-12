import React from 'react';
import {Form, Message} from 'semantic-ui-react'

const FormField = ({
  input, label, autoComplete, type,
  meta: {touched, error, submitError, dirtySinceLastSubmit}
}) =>
    <React.Fragment>
      <Form.Input
          required
          label={label}
          error={(error && touched) || (submitError && !dirtySinceLastSubmit)}
          placeholder={`Enter ${label.split(" ").pop().toLowerCase()}`}
          type={type}
          autoComplete={autoComplete}
          {...input}
      />
      {((error && touched) || (submitError && !dirtySinceLastSubmit)) &&
      <Message error content={error || submitError}/>}
    </React.Fragment>

export default FormField;