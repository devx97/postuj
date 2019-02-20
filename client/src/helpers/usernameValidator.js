import {addValidator} from "redux-form-validators"

export default addValidator({
  defaultMessage: "Invalid username.",
  validator: function(options, value, allValues) {
    return /^[a-zA-Z0-9]+([-_][a-zA-Z0-9]+)*[a-zA-Z0-9]$/.test(value)
  }
})
