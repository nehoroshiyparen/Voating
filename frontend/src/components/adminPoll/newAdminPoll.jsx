import React from 'react'
import './index'

export default function NewAdminPoll({onPollCreate}) {

    const createPoll = async(e) => {
        const newPoll = e.target.closest('.newPoll')
        if (newPoll) {
            const newTitle = newPoll.querySelector('.ttl')
            const newDescription = newPoll.querySelector('.dsc')
            if (newTitle && newDescription) {
                if (newTitle.innerText && newTitle.innerText.trim() != "" && newDescription.innerText && newDescription.innerText.trim() != "") {
                    onPollCreate(newTitle.innerText, newDescription.innerText, 1, 'admin')
                }
            }
        }
    }



    return (
        <>
            <div className="newPoll" id={`pollIdid`}>
                <div className="new_poll_title" >
                    <span>#id. </span>
                    <span className='default title_default'>Название</span>
                    <span className='outline_none  ttl' contentEditable='true' suppressContentEditableWarning='true'></span>
                </div>
                <div className="new_poll_description">
                    <span style={{textDecoration: 'underline'}}>Описание: </span>
                    <span className='default description_default'>Описание</span>
                    <span className='outline_none dsc' contentEditable='true' suppressContentEditableWarning='true'></span>
                </div>
                <div className="button add_button bttn" onClick={(e) => createPoll(e)}>
                    Добавить
                </div>
            </div>
        </>
    )
}

//добавление опроса

/*
    Кнопка готова

    для каждого contentEnitable сделать дефолт, который будет исчезать при нажатии

    седлать функцию, которая будет создавать опрос с заданным названием и описанием

    подкорректировать, если нужно будет, обновление всего списка полов
*/