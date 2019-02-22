const express = require('express')
const mongoose = require('mongoose')
mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(cors({exposedHeaders: 'jwt'}))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const mainRoutes = require('./routes/index')
const authRoutes = require('./routes/auth')
app.use('/api', mainRoutes)
app.use('/api/auth', authRoutes)

app.use((err, req, res) => {
  const message = err.message
  const data = err.data
  res.status(err.statusCode || 500).json({message, data})
})
const PORT = process.env.PORT || 5000
mongoose.connect(process.env.DB_URI)
.then(() => {
  app.listen(PORT)
})
.catch(console.log)