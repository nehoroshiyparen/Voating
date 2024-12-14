import React from 'react'

export default function Answer({id, text, index, onAnswerClick}) {
    
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K']

    const handleClick = () => {
        onAnswerClick(id, index);
    };

    return (
        <div className='answer_variant' onClick={handleClick}>
            <div className='answer_letter'>
                <span>{letters[index]}</span>
            </div>
            <div className='client_answer'>
                <span>{text}</span>
            </div>
        </div>
    )
}