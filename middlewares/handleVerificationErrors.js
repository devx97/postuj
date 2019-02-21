const {validationResult} = require('express-validator/check')

const submissionErrorFormatter = require('../helpers/submissionErrorFormatter')

module.exports = (req, res, next) => {
  const errors = validationResult(req).formatWith(submissionErrorFormatter)
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: 'Validation failed, entered data is incorrect.',
      errors: errors.mapped()
    })
  }
  next()
}
