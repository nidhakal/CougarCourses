function showList(course) {
    console.log("I am at showList");
    $('#PLScourse_list').empty();
    PLScourses = course;

    for (let i = 0; i < course.length; i++) {
        $('#PLScourse_list').append("<li class='list-group-item'></li>");

    }
    console.log(course)

    $('#PLScourse_list li')
        .attr("value", function (idx) {
            return course[idx]._id;
        })
        .append("<div class='row'></div>");

    $('#PLScourse_list .row').addClass(function (idx) {
        if (idx % 2 === 0) {
            return 'even_row';
        } else {
            return 'odd_row';
        }
    });

    $('#PLScourse_list .row')
        .append('<div class="col-4 course_name" ></div>')
        .append('<div class="col-4 att"></div>')
        .append('<div class="col-4 buttonDiv"></div>')

    $('.course_name')
        .append(function (idx) {
            return `<p class="ma">${course[idx].Name}</p>`;
        })
    $('.att')
        .append(function (idx) {
            return `<p class="mo">${course[idx].Attribute}</p>`
        })

    $('.buttonDiv')
        .append(function (idx) {
            return `<div class="col-2 d-flex justify-content-end"><button class="btn btn-outline-primary" onclick="showPLSCourse(${idx})">Taken</button></div>`

        });

    $('.button').on('click', function () {
        const carid = $(this).parents('li').attr("value");
        console.log(carid);
        location.href = "detail.html?car_id=" + carid;
    });

}


$.getJSON("/get_pls_courses").done(function (data) {
    console.log(data)
    if (data.message === "success") {
        showList(data["data"]);
    }
});


let PLScourses = []
let PLScourse_id = []
// console.log(likes)

function showPLSCourse(idx) {
    console.log(PLScourses[idx])
    // const courseID = $(this).val();
    const course=PLScourses[idx]
    PLScourse_id.push(idx)
    $.post('/PLS_course_taken', {course}).done((data) =>{
        console.log("this is data"+ data)
        if(data["message"] === "success"){
            //likes.push(cars[carID])
            // location.reload()
            // console.log(likes)
        }else{
            location.href = data.data+"?error="+data.message;
        }
    })
}

function PLSnotTaken(){
    for (let i = 0; i < PLScourses.length; i++) {
        if(!PLScourse_id.includes(i)){
            const course= PLScourses[i]
            $.post('/PLS_not_taken', {course}).done((data) =>{
                console.log("this is data"+ data)
                if(data["message"] === "success"){
                    location.href = "profile.html"
                    //likes.push(cars[carID])
                    // location.reload()
                    // console.log(likes)
                }else{
                    location.href = data.data+"?error="+data.message;
                }
            })
        }
    }
}