import { $host } from "./index";

export const fetchVotes = async(poll_id = null, question_id = null, answer_id = null, user_id = null) => {
    try {
        const response = await $host.get('/api/vote', {
            params: {
                poll_id,
                question_id,
                answer_id,
                user_id
            }
        })


        return response.data
    } catch (error) {
        console.log(error)
    }
}