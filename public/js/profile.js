function load_user(user) {
    console.log(user)

    $('#profile_img').attr('src', user.url);
    $('#u-name').text(user.fullname);
    if(user.courses_taken){
        user.courses_taken.forEach((CScourse)=>{
            console.log(CScourse.Course_num)
            const course =CScourse.Course_num+" "+ CScourse.Title + " ";

            $('#taken-course').append(`<li class="list-group-item">${course}</li>`);
        });
    }
    if(user.courses_nottaken){

        user.courses_nottaken.forEach((CScourse)=>{
            console.log(CScourse.Course_num)
            const course =CScourse.Course_num+" "+ CScourse.Title+ ","+ " "+"Offering Semester" +": "+ CScourse.Offering;

            $('#not-taken-course').append(`<li class="list-group-item">${course}</li>`);
        });
    }
    if(user.PLScourses_taken){

        user.PLScourses_taken.forEach((PLScourse)=>{
            console.log(PLScourse.Name)
            const course =PLScourse.Name+" "+ PLScourse.Attribute;

            $('#taken-PLS-course').append(`<li class="list-group-item">${course}</li>`);
        });


    }
    if(user.PLScourses_nottaken){
        user.PLScourses_nottaken.forEach((PLScourse)=>{
            // console.log(PLScourse.Course_num)
            const coursePLS =PLScourse.Name+" "+ PLScourse.Attribute;
            $('#not-taken-PLS-course').append(`<li class="list-group-item">${coursePLS}</li>`);
        });


    }

}

$(document).ready(function (){
    $.getJSON('/get_current_user').done(function (data) {
        if (data['message'] === "success") {
            load_user(data['data'])
        }})
})



