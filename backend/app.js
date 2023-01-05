// we used require function to use the express module
const express = require('express');  
const app = express()

// for the server to run on port 8087 
const PORT = 8087

// for handling http post request, we had to use body-parser node module.
// body-parser is a middleware module
const bodyParser = require('body-parser')

// allows us to relax the security applied to an API
const cors = require('cors');

// block cors type requests
// will enable the express server to respond to preflight requests.
app.use(cors())

// parse application/x-www-form-urlencoded
// parses the incoming request with urlencoded payloads and is based upon the body-parser.
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
// tells the system that we want json to be used
app.use(bodyParser.json())

//now to server will run on port 8087
app.listen(
  PORT,
  () => console.log(`server is running on port ${PORT}`)
)

//api routes
app.post('/api/submitProject', (req, res) => {  
  //when we submit our data, we log the data on our console
  console.log('Your project is' ,req.body)
  res.status(201).json({
    message: 'Thing created successfully!'
  })
})
