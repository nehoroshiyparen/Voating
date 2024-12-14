const WebSocket = require('ws')

const rooms = {}

module.exports = {
    handleMessage: (ws, message, wss) => {
        function broadcastToRoom(poll_id, message) {
            if (rooms[poll_id]) {
                rooms[poll_id].forEach(client => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify(message))
                    }
                })
            }
        } 

        const data = JSON.parse(message)
        if (data.role === 'admin') {
            if (data.type === 'changeQuestion') {
                const message = { type: 'questionChanged', question_id: data.question_id, poll_id: data.poll_id }
                broadcastToRoom(data.poll_id, message)
            } else if (data.type === 'endPoll') {
                const message = { type: 'pollEnded' }
                broadcastToRoom(data.poll_id, message)
            } else if (data.type === 'startPoll') {
                const message = { type: 'startPoll', poll_id: data.poll_id }
                broadcastToRoom(data.poll_id, message)
            }
        } else if (data.action === 'join') {
            const poll_id = data.poll_id

            if (!rooms[poll_id]) {
                rooms[poll_id] = []
            }
            rooms[poll_id].push(ws)

            ws.poll_id = poll_id
        }
    },

    handleConnection: function(ws, wss) {
        console.log('Новое соединение')

        ws.on('message', (message) => {
            this.handleMessage(ws, message, wss)
        })

        ws.on('close', () => {
            console.log('Соединение закрыто')

            const poll_id = ws.poll_id
            if (poll_id && rooms[poll_id]) {
                rooms[poll_id] = rooms[poll_id].filter(client => client !== ws)
            }
        })
    }
}