$(document).on('click', '.answer_variant', highlight_handler)

function highlight_handler(event) {
    const elem = event.currentTarget
    $(elem).css({background: '#ffd6ae'})
    $('.submit_answer').css({background: '#ffb163'})
    $(document).off('click', highlight_handler)
} 