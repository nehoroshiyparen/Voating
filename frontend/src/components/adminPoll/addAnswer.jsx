import React, {useState, useRef } from 'react'
import { createAnswer_byAPI } from '../../http/answerAPI'
import { clearText } from './index.js'

export default function AddAnswer({question_id, poll_id, onAdd, answer}) {
    const [addNewAnswer, setAddnNewAnswer] = useState()
    const answerRef = useRef(null)

    function createAnswer(e) {
        const answer = e.target.closest('.answer')
        const input = answer.querySelector('.NA_input')
        if (input.innerText && input.innerText.trim('') != '') {
            onAdd(question_id, addNewAnswer)
            setTimeout(function() {
                answerRef.current.innerText = ''
            }, 10)
        }
    }

    return (
        <>
            <div className={`answer new_AFP${poll_id}_FQ${question_id}`}>
                <div className='NAball'/>
                <div className={`NA_input`} id={`NAFQ_id${question_id}`} ref={answerRef} contentEditable='true' suppressContentEditableWarning='true' onInput={e => setAddnNewAnswer(e.target.innerText)}>
                    {answer}
                </div>
                <div className='addAnswer'>
                    <img src="../../public/add.png" className='bttn create_answer' width={'100%'} height={'100%'} onClick={(e) => createAnswer(e)}/>
                </div>
                <div className={`ANA`} id={`FQ_id${question_id}`}>
                    Добавить ответ...
                </div>
            </div>
        </>
    )
}