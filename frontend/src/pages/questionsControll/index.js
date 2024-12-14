$(document).on('click', '.return_to_questions', function() {
    $('.blackout').css({opacity: 0})
    $('.approval_container').css({opacity: 0})
    setTimeout(function() {
        $('.blackout').css({display: 'none'})
        $('.approval_container').css({display: 'none'})
    }, 300)
})