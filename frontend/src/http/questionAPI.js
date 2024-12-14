import { $host } from "./index";

export const createQuestion = async(poll_id, question_text) => {
	try {
		const response = await $host.post('api/question/', {
			poll_id,
			question_text
		})
	
		console.log('Вопрос создан')
		return response
	} catch (error) {
		console.log('Ошибка при создании вопроса: ' , error)
	}
}

export const deleteQuestion = async(question_id) => {
	try {
		const response = await $host.delete(`api/question/${question_id}`)
		
		console.log('Вопрос удален')
		return
	} catch (error) {
		console.log(error)
	}
}

export const editQuestion = async(poll_id, questions) => {
    //console.log('Отправляемые данные:', questions); // Добавьте это для проверки данных

    try {
        const response = await $host.post(`api/question/${poll_id}`, {
            questions
        });

        //console.log('Сохранено');
        return response.data;
    } catch (error) {
        console.error('Ошибка при попытке сохранить вопрос: ', error.response || error.message);
    }
}

export const get_one = async(id) => {
	try {
		const response = await $host.get(`api/question/?id=${id}`)
		
		return response.data
	} catch (error) {
		console.log(error)
	}
}

export const get_poll_questions = async(id) => {
	try {
		const response = await $host.get(`api/question/all/${id}`)

		return response.data
	} catch (error) {
		console.log(error)
	}
}