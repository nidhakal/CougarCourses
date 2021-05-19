function load_user(user) {
    $('#name').text(user.fullname);
    $('#brand').text(user.brand);
    $('#profile_img').attr('src', user.profile);
    // if(user.likes){
    //     $('#car_list')
    //         .append(function (idx){
    //             return `${user[idx].likes}`
    //         })
    //
    // }
}

$(document).ready(function (){
    $.getJSON('/get_current_user').done(function (data) {
        if (data['message'] === "success") {
            load_user(data['data'])
        }})
})

