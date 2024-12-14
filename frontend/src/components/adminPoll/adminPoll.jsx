import React,{useEffect, useState} from "react";
import './adminPoll.css'
import open from '../../..//public/open.png'
import block from '/block.png'
import './index'
import { editPoll, getSinglePollQuestions } from "../../http/pollAPI";
import AP_Question from "./question";
import { editQuestion, deleteQuestion, createQuestion } from "../../http/questionAPI";
import { editAnswers } from "../../http/answerAPI";
import { all } from "axios";
import NewQuestion from "./newQuestion";

export default function AdminPoll({id , title, description, user_name, isOpen}) {
    const [newTitle, setNewTitle] = useState(title);
    const [newDescription, setNewDescription] = useState(description);
    const [newQuestions, setNewQuestions] = useState([]);
    const [editComplete, setEditComplete] = useState(false) 
    const [newAnswers, setNewAnswers] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [access, setAccess] = useState(isOpen)

    useEffect(() => {
        getSinglePollQuestions(id)
            .then(data => {
                const transformedData = data.map((question) => ({
                    ...question,
                    type: 'question'
                }));
                setNewQuestions([...transformedData, { type: 'addQuestion', poll_id: id }]);        
            })
            .catch(error => {
                console.log("Ошибка при получении вопросов:", error);
            });
    }, [id]);

    const handleEdit = async (e) => {
        if (e.target.classList.contains('save')) {
            e.preventDefault();
            function permission() {
                const poll = document.getElementById(`upperPollId${id}`)
                const title = poll.querySelector('.pollTitle')
                const description = poll.querySelector('.pollDescription')

                const rightPoll = title.innerText && title.innerText.trim() != "" && description.innerText && description.innerText.trim() != ""

                const questions = poll.getElementsByClassName('DQ')
                for (let question of questions) {
                    const input = question.querySelector('.QT_input');
                    if (!input || input.innerText.trim() === '') {
                        return false;
                    }
                }

                if (rightPoll) {
                    return true
                } else {
                    return false
                }
            }

            if (permission()) {
                try {
                    setNewQuestions(prevQuestions => 
                        prevQuestions.map(question => {
                            const updatedQuestion = updatedQuestions.find(q => q.id === question.id);
                            return updatedQuestion ? { ...question, question_text: updatedQuestion.question_text } : question;
                        })
                    );
    
                    setNewAnswers(prevAnswers => 
                        prevAnswers.map(answer => {
                            const updatedAnswer = updatedAnswers.find(a => a.id === answer.id)
                            return updatedAnswer ? { ...updatedAnswer, answer: updatedAnswer.answer } : answer
                        })
                    )
    
                    setEditComplete(true)
                } catch (err) {
                    console.log(err)
                }
            }
        }
    }

    useEffect(() => {
        const saveChanges = async(id) => {
            try {
                const response4Poll = await editPoll(id, newTitle, newDescription, access)
                const response4Questions = await editQuestion(id, newQuestions)
                const response4Answers = await editAnswers(id, newAnswers)
            } catch (err) {
                console.log(err)
            }
        }
        if (newQuestions && newQuestions.length > 0 && editComplete) {
            saveChanges(id)
            setEditComplete(false)
        }
    }, [editComplete, newQuestions])

    let updatedQuestions = []

    const handleAddQuestion = async(poll_id, question_text) => {
        const response = await createQuestion(poll_id, question_text)
        const createdQuestion = response.data   
        console.log(createdQuestion)

        setNewQuestions((prevQuestions) => {
            const updatedQuestions = [...prevQuestions]

            updatedQuestions[updatedQuestions.length - 1] = {
                ...createdQuestion,
                type: 'question',
                id: createdQuestion.id,
                question_text: question_text
            }

            return [...updatedQuestions, {type: 'addQuestion', poll_id: id}]
        })
    }

    const handleQuestionChange = (id, updatedQuestionText) => {
        let flag = 0
        updatedQuestions.map(question => {
            if (question.id === id && question.id != updatedQuestionText ) {
                updatedQuestions.find(item => {
                    if (item.id === id) {
                        item.question_text = updatedQuestionText
                        flag += 1
                    }
                })
            }
        })
        if (flag === 0) {
            updatedQuestions.push({id: id, question_text: updatedQuestionText})
        }
    }

    const handleQuestionDelete = async(question_id) => {
        const response = await deleteQuestion(question_id)
        console.log(question_id)
        getSinglePollQuestions(id).then(data => {
            const transformedData = data.map((question) => ({
                ...question,
                type: 'question'
            }))
            setNewQuestions([...transformedData, {type: 'addQuestion', poll_id: id}])
        })
    }

    const handleAccess = () => {
        access === true ? setAccess(false) : setAccess(true)
    }

    useEffect(() => {
        
    }, [access])

    // нажатие на кнопку => удаление в бд => обновление newQuestions (?) => срабатывает useEffect, который перерисовывает слайдер

    let updatedAnswers = [] 

    const handleAnswerChange = (id, updatedAnswer) => {
        let flag = 0
        updatedAnswers.map(answer => {
            if (answer.id === id && answer.answer != updatedAnswer) {
                updatedAnswers.find(item => {
                    if (item.id === id) {
                        item.answer = updatedAnswer
                        flag += 1
                    }
                })
            }
        })
        if (flag === 0 ) {
            updatedAnswers.push({id: id, answer: updatedAnswer})
        }
    }

    const sliderFunc = () => {
        const slider = document.getElementById(`scrollId${id}`);
        const allTheQuestions = newQuestions.length;
        const goLeft = document.getElementById(`leftId${id}`);
        const goRight = document.getElementById(`rightId${id}`);

        const updateSliderWidth = () => {
            const width = allTheQuestions * window.innerWidth * 0.55;
            slider.style.width = `${width}px`;
        };

        const updateSliderPosition = () => {
            const offset = -currentQuestion * window.innerWidth * 0.55;
            slider.style.transform = `translateX(${offset}px)`;
        };

        updateSliderWidth();
        updateSliderPosition();
    }

    const handleLeftClick = () => {
        setCurrentQuestion(prev =>
            prev > 0 ? prev - 1 : newQuestions.length - 1
        );
    };

    const handleRightClick = () => {
        setCurrentQuestion(prev =>
            prev < newQuestions.length - 1 ? prev + 1 : 0
        );
    };

    useEffect(() => {
        if (newQuestions.length > 0) {
            const cleanup = sliderFunc(newQuestions);
            return cleanup; // Очистка при размонтировании
        }
    }, [newQuestions, currentQuestion]);

    return (
        <>
        <div className="upperPoll" id={`upperPollId${id}`}>
            <div className="hider">
                <div className="admin_panel" id={`adminPanelId${id}`}>
                    <div className="editor">
                        <div className="poll_topEditor" id={`poll_topEditor${id}`}>
                            <div className="poll_title_editor">
                                <div className="edit" style={{fontSize: '40px', textDecoration: 'italic'}}>
                                    РЕДАКТИРОВАНИЕ
                                </div>
                                <div className='pollTitle' type="text" defaultValue={newTitle} onInput={e => setNewTitle(e.target.innerText)} contentEditable='true' suppressContentEditableWarning='true'>{title}</div>
                            </div>
                            <div className="poll_description_editor">
                                <div className="pollDescription" type="text" defaultValue={newDescription} onInput={e => setNewDescription(e.target.innerText)} contentEditable='true' suppressContentEditableWarning='true'>{description}</div>
                            </div>
                        </div>
                        <div className="poll_bottomEditor">
                            <div className="goLeft" id={`leftId${id}`} onClick={() => handleLeftClick()}>
                                <img src="../../public/previous.png" width={'100%'} height={'100%'}></img>
                            </div>
                            <div className="question_slider">
                                <div className="scroll" id={`scrollId${id}`}>
                                    {newQuestions.map((item) => 
                                    item.type === 'question' ? (
                                        <AP_Question
                                            key={item.id}
                                            id={item.id}
                                            poll_id={item.poll_id}
                                            question_text={item.question_text}
                                            img={item.img}
                                            onQuestionChange={handleQuestionChange}
                                            onQuestionDelete={handleQuestionDelete}
                                            onAnswerChange={handleAnswerChange}
                                            setNewAnswers={setNewAnswers}/> 
                                    ) : (
                                        <NewQuestion
                                            key={`add-question-${id}`}
                                            poll_id={id}
                                            onQuestionCreate={handleAddQuestion}/>
                                    ))}
                                </div>
                            </div>
                            <div className="goRight" id={`rightId${id}`} onClick={() => handleRightClick()}>
                                    <img src="../../public/next.png" width={'100%'} height={'100%'}></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="poll" id={`pollId${id}`}>
                <div className="poll_title" >
                    <span>#{id}. </span>{newTitle}
                </div>
                <div className="poll_description">
                    <span style={{textDecoration: 'underline'}}>Описание: </span>
                    {newDescription}
                </div>
                <div className="status" onClick={() => handleAccess()}>
                    {access ? <img src={open} width={'22px'}></img> : <img src={block} width={'22px'}></img>}
                   {access ? <span style={{margin: '0 0 0 10px'}}>Открыто</span> : <span style={{margin: '0 0 0 10px'}}>Закрыто</span> }
                </div>
                <div className="poll_creator">
                    Создатель: <span style={{fontStyle: 'italic', margin: '0 3px 0 0px'}}>{user_name}</span>
                </div>
                <div className="button highlight bttn" id={id} onClick={handleEdit}>
                    Выделить
                </div>
                <div className="button render" id={id}>
                    Редактировать
                </div>
            </div>
        </div>
        </>
    )
}