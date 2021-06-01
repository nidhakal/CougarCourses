function load_user(user) {
    $('#u-name').text(user.fullname);
    if(user.courses_taken){
        user.courses_taken.forEach((CScourse)=>{
            console.log(CScourse.Course_num)
            const course =CScourse.Course_num+" "+ CScourse.Title+ " "+ CScourse.Instructor;

            $('#taken-course').append(`<li class="list-group-item">${course}</li>`);
        });


    }
    if(user.courses_nottaken){

        user.courses_nottaken.forEach((CScourse)=>{
            console.log(CScourse.Course_num)
            const course =CScourse.Course_num+" "+ CScourse.Title+ " ";

            $('#not-taken-course').append(`<li class="list-group-item">${course}</li>`);
        });
    }

}

$(document).ready(function (){
    $.getJSON('/get_current_user').done(function (data) {
        if (data['message'] === "success") {
            load_user(data['data'])
        }})
})

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

