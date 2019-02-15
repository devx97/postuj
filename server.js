const express = require('express')
const mongoose = require('mongoose')
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(bodyParser.json())

const mainRoutes = require('./routes/index')
app.use('/api', mainRoutes)

const PORT = process.env.PORT || 5000
mongoose.connect('mongodb://localhost/postuj')
.then(res => {
  app.listen(PORT)
})
.catch(console.log)