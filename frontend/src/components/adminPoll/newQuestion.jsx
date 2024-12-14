import React from 'react'
import './index'

export default function NewQuestion({poll_id, onQuestionCreate}) {

    const createQuestion = (e, poll_id) => {
        const questionElement = e.target.closest('.question')
        if (questionElement) {
            const inputElement = questionElement.querySelector('.QT_input')
            if (inputElement) {
                if(inputElement.innerText && inputElement.innerText.trim() != "") {
                    onQuestionCreate(poll_id, inputElement.innerText)
                    setTimeout(function() {
                        inputElement.innerText = ''
                    }, 10)
                    $('.layout').fadeIn(100)
                }
            }
        }
    }

    return (
        <>
            <div className='question newQuestion' id={`newQuestion4Pollid${poll_id}`}>
            <div className='question_options'>
                    <img src='../../public/options.png' width={'100%'}/>
                    <div className='unactive options'>
                            <div className='delete_question'>Удалить вопрос</div>
                    </div>
                </div>
                <div className={'question_title'}>
                    <div className='layout' id={`LO_id${poll_id}`}>Название вопроса</div>
                    <div className='QT_input' id={`NQFP_id${poll_id}`} contentEditable='true' suppressContentEditableWarning='true'></div>
                </div>
                <div className='NQ'>
                    <img src='../../public/add2.png' className='NQ_button bttn' width={'100px'} height={'100px'} onClick={(e) => createQuestion(e, poll_id)}/>
                </div>
            </div>
        </>
    )
}