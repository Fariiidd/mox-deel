import "dotenv/config";
import express from "express";
import { Server } from 'socket.io'
import { createServer } from "http";
const app = express();
const httpServer = createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000"
  }
})

io.on('connection', (socket) => {
  console.log('user conected')
  //start scraper
  
  socket.on('login', (data) => {
    console.log(data)

    socket.emit('otpPrompt')
  })

  socket.on('otp', (data) => {

  })

  socket.on('disconnect', () => {
    console.log('user disconected')
  })
})


httpServer.listen(4000, () => console.log('Listening 4000'))