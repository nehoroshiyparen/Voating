import React, {useEffect, useState, useRef } from 'react'
import Answer from './answer'
import './index'
import { gAFQ_id, gLAFQ_id, createAnswer_byAPI } from '../../http/answerAPI'
import AddAnswer from './addAnswer'

export default function AP_Question( {id, poll_id, question_text, img, onQuestionChange, onQuestionDelete, onAnswerChange, setNewAnswers } ) {
    const [newQuestion, setNewQuestion] = useState({id: id, poll_id: poll_id, question_text: question_text, img: img})
    const [questionAnswers, setQuestionAnswers] = useState([])

    useEffect(() => {
        gAFQ_id(id, poll_id).then(data => {
            const transformedData = data.map((answer) => ({
                ...answer, 
                type: 'answer'
            }))
            setQuestionAnswers([...transformedData, {type: 'addAnswer', poll_id: poll_id, question_id: id}])
        }).catch (error => {
            console.log(error)
        })
    }, [id, poll_id])

    // или вот здесь, пиздец
    useEffect(() => {
        gAFQ_id(id, poll_id).then(data => {
            setNewAnswers(prevAnswers => [...prevAnswers, ...data]);
        }).catch (error => {
            console.log(error);
            setError('Ошибка: сервер бэкенда не доступен');
			setIsLoading(false);
        }) 
    }, [id, poll_id])

    const handleShowOptions = (e) => {
        const qo = $(e.target).closest('.question_options')
        qo.find('.options').toggleClass('unactive')
    }

    const handleDelete = (id, e) => {
        onQuestionDelete(id)
    }

    const handleChange = (e) => {
        const updatedText = e.target.innerText
        setNewQuestion(updatedText)
        onQuestionChange(id, updatedText)
    }

    const handleAddAnswer = async(question_id, answer) => {
        const response = await createAnswer_byAPI(question_id, answer)
        const createdAnswer = response.data

        console.log(createdAnswer)
        
        setQuestionAnswers((prevAnswers) => {
            const updatedAnswers = [...prevAnswers]

            updatedAnswers[updatedAnswers.length - 1] =  {
                ...createdAnswer,
                type: 'answer',
                id: createdAnswer.id,
                answer: answer
            }

            return [...updatedAnswers, {type: 'addNewAnswer', poll_id: poll_id, question_id: id, answer: ''}]
        })
    }

    return (
        <>
            <div className={`OfPollId${poll_id} question DQ question_id${id} fade-in`}>
                <div className='question_options' onClick={(e) => handleShowOptions(e)}>
                    <img src='../../public/options.png' width={'100%'}/>
                    <div className='unactive options'>
                            <div className='delete_question' onClick={(e) => {handleDelete(id, e)}}>Удалить вопрос</div>
                    </div>
                </div>
                <div className={'question_title'}>
                    <div className='QT_input' contentEditable='true' suppressContentEditableWarning='true' onInput={handleChange}>{question_text}</div>
                </div>
                <div className='answers'>
                    {questionAnswers.map((item, index) => 
                     item.type === 'answer' ? (
                        <Answer 
                            key={item.id}
                            id={item.id}
                            poll_id={item.poll_id}
                            question_id={item.question_id}
                            answer={item.answer}
                            onAnswerChange={onAnswerChange}
                        />
                    ) : (
                        <AddAnswer 
                            key={`add-answer-${item.question_id}`}
                            question_id={item.question_id}
                            poll_id={item.poll_id}
                            onAdd={handleAddAnswer}
                        />
                    )
                    )}
                </div>
                <div className='img_url_input' contentEditable='true' suppressContentEditableWarning='true' onInput={handleChange}>
                    
                </div>
            </div>
        </>
    )
}


// сделать исчезновение - изи

// сделать удаление из бд - изи

// сделать изменение состояния слайдера - не изи !!!