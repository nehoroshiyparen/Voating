// pointed circles

$(document).on('click', '.Aball', function() {
    let answerClass = $(this.classList)[1]
    if (this.classList.contains('right_answer')) {
        $(`.${answerClass}`).removeClass('right_answer')
    } else {
        $(`.${answerClass}`).removeClass('right_answer')
        $(this).addClass('right_answer')
    }
})

// delete answer

$(document).on('click', '.deleteAnswer', function() {
    let id = this.id
    $(`#answer${id}`).css({opacity: 0})
    setTimeout(function() {
        $(`#answer${id}`).remove()
    }, 600)
})

let hidden

$(document).on('click', '.ANA', function() { // add new answer = ANA
    $(this).hide()
    hidden = this
    $('.NAball').addClass('activeNA')
    const question_id = this.id.slice(5)
    console.log(question_id)
    document.getElementById(`NAFQ_id${question_id}`).focus()
})

//add new answer

$(document).on('blur', '.NA_input', function() { //NA = new answer
    if (!this.innerText || this.innerText.trim() == '') {
        $(hidden).show()
        $('.NAball').removeClass('activeNA')
    }
})

$(document).on('click', '.addAnswer', function() {
    const answer = this.closest('.answer')
    const input = answer.querySelector('.NA_input')
    if (input.innerText && input.innerText.trim('') != '')  {
        $('.NAball').removeClass('.activeNA')
        $('.NA_input').blur()
    }
})

export function clearText(id) {
    console.log($(`#${id}`))
    $(`#${id}`).innerText = null
}

// add new question

$(document).on('click', '.layout', function() {
    $(this).fadeOut(100)
    const poll_id = this.id.slice(5)
    document.getElementById(`NQFP_id${poll_id}`).focus()
})

$(document).on('blur', '.QT_input', function() {
    if (!this.innerText || this.innerText.trim() == '') {
        $('.layout').fadeIn(100)
    }
})

$(document).on('click', '.NQ_button', function() {
    const questionElement = this.closest('.question')
    if (questionElement) {
        const inputElement = questionElement.querySelector('.QT_input')
        if (inputElement) {
            if(inputElement.innerText && inputElement.innerText.trim() != "") {
                
            }
        }
    }
})

// show question options

$(document).on('click', '.options', function(event) {
    event.stopPropagation();
})

// delete question

// POLL CREATE

$(document).on('click', '.default', function() {
    $(this).fadeOut(100)
    const newPoll = this.closest('.newPoll')
    if (this.classList.contains('title_default')) {
        newPoll.querySelector('.ttl').focus()
    }

    else {
        newPoll.querySelector('.dsc').focus()
    }
})

$(document).on('blur', '.ttl', function() {
    if (!this.innerText || this.innerText.trim() === '') {
        $('.title_default').fadeIn(100)
    }
})

$(document).on('blur', '.dsc', function() {
    if (!this.innerText || this.innerText.trim() === '') {
        $('.description_default').fadeIn(100)
    }
})

// save changes 

$(document).on('click', '.bttn', function() {
    let yep = false

    if ($(this).hasClass('save')) {

        const poll = this.closest('.upperPoll')
        const title = poll.querySelector('.pollTitle')
        const description = poll.querySelector('.pollDescription')

        const rightPoll = title.innerText && title.innerText.trim() != "" && description.innerText && description.innerText.trim() != ""

        function isQuestionRight() {
            const questions = poll.getElementsByClassName('DQ')
            for (let question of questions) {
                const input = question.querySelector('.QT_input');
                if (!input || input.innerText.trim() === '') {
                    return false
                }
            }
            return true
        }

        if (isQuestionRight() && rightPoll) {
            document.querySelector('.alert').innerText = 'Изменения сохранены'
            $('.notification').css({background: '#62d371'})
        } else {
            document.querySelector('.alert').innerText = 'Укажите все данные'
            $('.notification').css({background: '#dc4a25'})
        }

        yep = true
    } else if ($(this).hasClass('delete')) {
        if (document.getElementsByClassName('choosen').length != 0) {
            document.querySelector('.alert').innerText = 'Элементы удалены'
            $('.notification').css({background: '#dc4a25'})
            yep = true
        }
    } else if ($(this).hasClass('add_button')) {
        const newTitle = document.querySelector('.ttl')
        const newDescription = document.querySelector('.dsc')
        const correctTitle = newTitle.innerText && newTitle.innerText.trim() != ""
        const correctDescription = newDescription.innerText && newDescription.innerText.trim() != ""
        if ( correctTitle && correctDescription ) {
            document.querySelector('.alert').innerText = 'Опрос создан'
            $('.notification').css({background: '#62d371'})
            yep = true
        } else {
            document.querySelector('.alert').innerText = 'Необходимо указать данные'
            $('.notification').css({background: '#dc4a25'})
            /*if (!correctTitle) {
                document.querySelector('.title_default').style.color = '#0DDBFC'
                setTimeout(function() {
                    document.querySelector('.title_default').style.color = 'white'
                }, 3000)
            }
            if (!correctDescription) {
                document.querySelector('.description_default').style.color = '#0DDBFC'
                setTimeout(function() {
                    document.querySelector('.description_default').style.color = 'white'
                }, 3000)
            }*/
            yep = true
        }
    } else if ($(this).hasClass('NQ_button')) {
        const question = this.closest('.question')
        const input = question.querySelector('.QT_input')

        console.log(input)

        if (input.innerText.trim() === '') {
            document.querySelector('.alert').innerText = 'Необходимо указать вопрос'
            $('.notification').css({background: '#dc4a25'})
            yep = true
        }
    } else if ($(this).hasClass('create_answer')) {
        const answer = this.closest('.answer')
        const input = answer.querySelector('.NA_input')

        console.log(input)

        if (input.innerText.trim() === '') {
            document.querySelector('.alert').innerText = 'Необходимо указать ответ'
            $('.notification').css({background: '#dc4a25'})
            yep = true
        }
    }
    console.log(yep)

    if (yep) {
        $('.notification').css({transform: 'translateY(-70px)'})

        setTimeout(function() {
            $('.notification').css({transform: 'translateY(-250px)'})
        }, 3000)
    }
})