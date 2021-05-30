function load_user(user) {
    $('#u-name').text(user.fullname);
    // $('#brand').text(user.brand);
    // $('#profile_img').attr('src', user.profile);
    // if(user.likes){
    //     $('#car_list')
    //         .append(function (idx){
    //             return `${user[idx].likes}`
    //         })
    //
    // }
    if(user.courses_taken){

        user.courses_taken.forEach((CScourse)=>{
            console.log(CScourse.Course_num)
            const course =CScourse.Course_num+" "+ CScourse.Title+ " "+ CScourse.Instructor;

            $('#taken-course').append(`<li class="list-group-item">${course}</li>`);
        });


    }
}

$(document).ready(function (){
    $.getJSON('/get_current_user').done(function (data) {
        if (data['message'] === "success") {
            load_user(data['data'])
        }})
})
