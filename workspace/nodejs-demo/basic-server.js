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
    res.end('<h1>Hi! Basic server !</h1>')
})

// READ/WRITE A FILE
const fs = require('fs')

let str = "Test of a node basic server"
const fname =  '/tmp/testnode.txt';

fs.open(fname, "w", (err, fd)=>{
  if(err){
      console.log(err.message);
  }else{
      fs.write(fd, str, (err, bytes)=>{
          if(err){
              console.log(err.message);
          }else{
              console.log(bytes +' bytes written to file: ' + fname);
          }
      })        
  }
})

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
    console.log(`Server running on port ${port}`)
})