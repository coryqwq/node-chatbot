//instantiate express and listen to the server
const express = require('express');
const app = express();

app.use (express.static(__dirname + '/views')); //html
app.use(express.static(__dirname + '/public')); //js, css, images

const server = app.listen(5000);
app.get('/', (req, res) => {
    res.sendFile('index.html');
});

const io = require('socket.io')(server);
io.on('connection', function(socket){
  console.log('a user connected');
});

//initialize api.ai with access token
require('dotenv').config()
const apiai = require('apiai')(process.env.APIAI_TOKEN);

io.on('connection', function(socket) {
    socket.on('chat message', (text) => {
  
      //get a reply from API.AI
      let apiaiReq = apiai.textRequest(text, {
        sessionId: APIAI_SESSION_ID
      });
  
      apiaiReq.on('response', (response) => {
        let aiText = response.result.fulfillment.speech;
        socket.emit('bot reply', aiText); //send the result back to the browser!
      });
  
      apiaiReq.on('error', (error) => {
        console.log(error);
      });
  
      apiaiReq.end();
  
    });
  });