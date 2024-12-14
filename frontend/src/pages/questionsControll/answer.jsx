import React from 'react'
import './style.css'

export default function Answer({text, index}) {

    return (
        <>
            <div className='answer_info'> {/* answer_info потому что в будущем можно будет добавить сюда доп инфу да пусть будет похуй*/}
                <div className='answers_circle'>{index + 1}</div>
                <div className='answer_text'>
                    <span>{text}</span>
                </div>
            </div>
        </>
    )
}