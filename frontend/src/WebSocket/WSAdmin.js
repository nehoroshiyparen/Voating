export default function createAdminSocket() {
    const adminSocket = new WebSocket('ws://localhost:8080')

    adminSocket.onopen = () => {
        console.log('Админ подключен')
        adminSocket.send(JSON.stringify({role: 'admin'}))
    }

    function startPoll(poll_id) {
        adminSocket.send(JSON.stringify({ role: 'admin' , type: 'startPoll', poll_id}))
        console.log('Отправлен запрос пользователям о начале голосования')
    }

    function changeQuestion(question_id) {
        adminSocket.send(JSON.stringify({ role: 'admin' , type: 'changeQuestion', question_id }))
        console.log('ЗАпрос на смену вопроса отправлен')
    }

    function endPoll() {
        adminSocket.send(JSON.stringify({ role: 'admin' , type: 'endPoll'}))
        console.log('Отправлен запрос для окончания опроса')
    }

    function closeConnection() {
        if (adminSocket.readyState === WebSocket.OPEN) {
            adminSocket.close()
            console.log('Соединение закрыто')
        }
    }

    return {
        startPoll,
        changeQuestion,
        endPoll,
        closeConnection
    }
}