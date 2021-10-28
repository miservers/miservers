// Reference: 
//    https://nodejs.dev/learn
//
// Run the Http serve : 
//   node basic-server.js

const http = require('http')

const port = process.env.PORT || 3000

const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.end('<h1>Hey !</h1>')
})

// READ A FILE
const fs = require('fs')

const fname =  '/tmp/test.csv';
fs.readFile( fname, 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  console.log('Reading file: ' + fname)
  console.log(data)
})

// Start the server
server.listen(port, () => {
    console.log(`Server running at port ${port}`)
})