const userSocket = new WebSocket(import.meta.env.WEBSOCKET_URL)

userSocket.onopen = () => {
    console.log('Пользователь подключен')
    userSocket.send(JSON.stringify({role: 'user'}))
}

userSocket.onmessage = ({ data }) => {
    const parsedData = JSON.parse(data)
    if (parsedData.type === 'questionChanged') {
        console.log('Пытаюсь обновить вопрос', parsedData.question_id)
        
    } else if (parsedData.type === 'pollEnded') {
        console.log('Опрос окончен')
        userSocket.close()
    }
}