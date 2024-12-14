const WebSocket = require('ws')
const WS_PORT = process.env.WS_PORT
const wsHandler = require('./WSFunctions/WSHandlers.js')

const wsServer = new  WebSocket.Server({ port: WS_PORT })

wsServer.on('connection', (ws) => {
    wsHandler.handleConnection(ws, wsServer)
})

console.log(`WebSocket server started on PORT ${WS_PORT}`)