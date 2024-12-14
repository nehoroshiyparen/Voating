import React, { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import './questionsControll/style.css'
import './questionsControll/index.js'
import { gAFQ_id } from '../http/answerAPI'
import { nextQuestion, prevQuestion } from '../http/active_pollAPI'
import Answer from './questionsControll/answer'
import { get_one } from '../http/questionAPI'
import { fetchOnePoll } from '../http/pollAPI'
import { useWebSocket } from '../WebSocket/WebSocketContext.jsx'

export default function QuestionControll() {

    const { adminSocket, changeQuestion, endPoll } = useWebSocket()

    const { id } = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const activePoll = location.state.activePollData

    useEffect(() => {
        if (!id) {
            localStorage.setItem(location.pathname, JSON.stringify(id))
            setActivePoll_id(id)
        }
    })


    const [activePoll_id, setActivePoll_id] = useState(() => {
        const poll_id = localStorage.getItem(location.pathname)
        return poll_id ? JSON.parse(poll_id) : id
    })
    const [currentQuestion, setCurrentQuestion] = useState(() => {
        const page_question_id = localStorage.getItem(`page_question_id${activePoll_id}`)
        return page_question_id ? JSON.parse(page_question_id) : 1 /* <= что за нах */
    })
    const [question_id, setQuestion_id] = useState(() => {
        const savedQuestionId = localStorage.getItem(`question_id${activePoll_id}`)
        return savedQuestionId ? (JSON.parse(savedQuestionId)) : activePoll.question_id
    })
    const [question_title, setQuestion_title] = useState(() => {
        const savedQuestionTitle = localStorage.getItem(`question_title${activePoll_id}`)
        return savedQuestionTitle ? (JSON.parse(savedQuestionTitle)) : ''
    })
    const [answers, setAnswers] = useState([])
    const [over, setOver] = useState(false)
    const [poll_title, setPoll_title] = useState()

    useEffect(() => {
        if (!localStorage.getItem(`question_title${activePoll_id}`)) {
            get_one(activePoll.question_id).then(data => {
                setQuestion_title(data.question_text) 
                localStorage.setItem(`question_title${activePoll_id}`, JSON.stringify(data.question_text))
            }).catch(error => {
                console.log("Ошибка при получении первого вопроса", error)
            })
        }
    }, [activePoll.id])

    useEffect(() => {
        if (currentQuestion - 1 != 0) {
            $('.go_to_previous').css({display: 'flex'})
            setTimeout(() => {
                $('.go_to_previous').css({opacity: 1})
            }, 20)
        } else {
            $('.go_to_previous').css({opacity: 0})
            setTimeout(() => {
                $('.go_to_previous').css({display: 'none'})
            }, 300)
        }
            gAFQ_id(question_id, activePoll.poll_id).then((data) => {
                try {
                    setAnswers(data)
                    localStorage.setItem(`question_id${activePoll_id}`, JSON.stringify(question_id))
                    localStorage.setItem(`question_title${activePoll_id}`, JSON.stringify(question_title))
                    localStorage.setItem(`page_question_id${activePoll_id}`, JSON.stringify(currentQuestion))
                } catch(e) {
                    console.log(e)
                }
            fetchOnePoll(activePoll_id).then((data) => {
                try {
                    setPoll_title(data.title)
                } catch (error) {
                    console.log('Ошибка при получнии информации о голосовании: ', error)
                }
            })
            })
    }, [question_id, question_title, activePoll.id])

    useEffect(() => {
        if (over) {
            $('.blackout').css({display: 'block'})
            $('.approval_container').css({display: 'flex'})

            setTimeout(() => {
                $('.blackout').css({ opacity: 0.5 });
                $('.approval_container').css({ opacity: 1 });
            }, 10);
        }
    }, [over])

    const approval = async() => {
        setOver(false)
    }

    

    const move_to_results = async() => {
        endPoll(id)
        localStorage.removeItem(`question_id${activePoll_id}`);
        localStorage.removeItem(`question_title${activePoll_id}`);
        localStorage.removeItem(`page_question_id${activePoll_id}`);
        localStorage.removeItem(`activeStatus_pollId${activePoll_id}`)
        navigate(`/results/${activePoll_id}`)
    }
    
    const next_question = async(poll_id) => {
        const response = await nextQuestion(poll_id) // nextQuestion from API
        if (response) {
            setCurrentQuestion(currentQuestion + 1)
            setQuestion_id(response.id)
            setQuestion_title(response.question_text)
            changeQuestion(response.id, id)
        } else {
            setOver(true)
        }
    }

    const prev_question = async(poll_id) => {
        if (currentQuestion - 1 != 0) {
            const response = await prevQuestion(poll_id) // передавать в usestate сам вопрос а уже куда то потом доставать айди и 
            if (response) {                              // названия вопросов. Также разобраться с багом про номер вопроса page_question_id
                setCurrentQuestion(currentQuestion - 1)
                setQuestion_id(response.id)
                setQuestion_title(response.question_text)
                changeQuestion(response.id, id)
            } else {
                console.log('you')
            }
        } else {

        }
    }

    return (
        <>
        <div className='page' style={{margin: '100px 0 0 0'}}>
            <div className='blackout'>

            </div>
            <div className='approval_container'>
                <div className='approval'>
                    <div className='approval_text'>
                        Это конец голосования
                    </div>
                    <div className='approval_flex'>
                        <div className='approval_button return_to_questions' onClick={() => approval()}> 
                            Вернуться назад
                        </div>
                         <div className='approval_button' onClick={() => move_to_results()}>
                            Перейти к результатам
                        </div>
                    </div>
                </div>
            </div>
            <div className='poll_status'>
                    {currentQuestion}/3
            </div>
            <div className='container'>
                <div className='info_box'>
                    <div className='poll_name'>
                        
                    </div>
                    <div className='box_inside'>
                        <div className='active_question_title'>
                            №{currentQuestion}. <span className='title'>{question_title}</span>
                        </div>
                        <div className='answers_container'>
                            {answers.map((answer, index) => 
                                <Answer key={answer.id}
                                        text={answer.answer}
                                        index={index}/>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className='switcher'>
                    <div className='switcher_inside'>
                        <div className='go_to_previous'>
                        <img src='../../public/go_back.png' height={'90%'} onClick={() => prev_question(activePoll_id)}></img>
                        </div>
                        <div className='go_to_next'>
                            <img src='../../public/go_next.png' height={'90%'} onClick={() => next_question(activePoll_id)}></img>
                        </div>
                    </div>
            </div>
        </div>
        </>
    )
}