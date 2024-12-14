import {$host} from './index'


export const createAnswer_byAPI = async(question_id, answer) => {
    try {
        const response = await $host.post(`api/answer/`, {
            question_id,
            answer
    })

        console.log('Добавлен ответ')
        return response
    } catch (error) {
        console.log(error)
    }
}

export const gAFQ_id = async (question_id, poll_id) => { // get answers for question _ id
    try {
        // Передаем параметры через query в строке запроса
        const { data } = await $host.get(`api/answer?question_id=${question_id}&poll_id=${poll_id}`);
        return data;
    } catch (error) {
        console.error("Ошибка при получении ответов:", error);
        throw error;
    }
}

export const gLAFQ_id = async(question_id, poll_id) => { // get last answer for question _ id оказалось, что нахуй не нужно, но пусть будет пока что
    try {
        const response = await $host.get(`api/answer/last/${question_id}&${poll_id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const deleteAnswer = async(id) => {
    try {
        const response = await $host.delete(`api/answer/${id}`)

        console.log('удалено', id)
        return
    } catch (error) {
        console.log(error)
    }
}

export const editAnswers = async(poll_id, answers) => {
    try {
        const response = await $host.post(`api/answer/${poll_id}`, {
            answers
        })

        return response.data
    } catch (error) {
        console.error('Ошибка при попытке сохранить ответ')
    }
}