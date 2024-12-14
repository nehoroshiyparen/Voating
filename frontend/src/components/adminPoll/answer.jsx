import React, {useEffect, useState} from 'react'
import { deleteAnswer } from '../../http/answerAPI'
import './index'

export default function Answer({id, question_id, answer, poll_id, onAnswerChange}) {
    const [newAnswer, setNewAnswer] = useState(answer)
    useEffect(() => {

    })  

    const handleChange = (e) => {
        const updatedAnswer = e.target.innerText
        setNewAnswer(updatedAnswer)
        onAnswerChange(id, updatedAnswer)
    }   

    function handleDelete() {
        deleteAnswer(id)
    }

    return (
            <div className={`answer AFP${poll_id}_FQ${question_id}`} id={`answer${id}`} key={id}>
                <div className={`Aball AFP${poll_id}_FQ${question_id}`}/><div className='AT_input' onInput={handleChange} contentEditable='true' suppressContentEditableWarning='true'>{answer}</div>
                <div className='deleteAnswer' id={id}>
                    <img src='../../public/close2.png' width={'100%'} height={'100%'} onClick={handleDelete}/>
                </div>
            </div>
    )
}