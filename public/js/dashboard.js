$('.dashHeading')
    .append(`<div class = "dashName"><h2></h2></div>`)
    .append(`<div class = 'card dashCard'></div>`)

$('.dashName h2').append(`Welcome, Sujhan Ghimire!`)
$('.dashCard').append(`Major 1: Computer Science <br> Minor 1: Economics <br> Minor 2: Entrepreneurship and Innovation <br>`)

$(document).ready(function (){
    $.getJSON('/get_current_user').done(function (data) {
        console.log(data)
        if(data['message'] === "success"){
            $('.login').remove();
            $('#showname').text(data.data.fullname);
        }else{
            $('.logout').remove()
        }
    })
})