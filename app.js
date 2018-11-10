const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors');
require('dotenv').config()
const port = process.env.SERVER_PORT
const app = express()
const router = require('./routes')

//CORS 설정

app.use(cors());

app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())

app.use('/',router)

const server = app.listen(port, () => {
  console.log(`Express Server is Running on ${port}`)
})
