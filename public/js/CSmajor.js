function showList(course) {
    courses = course;
    console.log("I am at showList");
    $('#CScourse_list').empty().append(`<ul class="CSClasses"></ul>`);

    for (let i = 0; i < course.length; i++) {
        $('.CSClasses').append("<li class='CompSciClass'></li>");
    }

    $('#CScourse_list li')
        .attr("value", function (idx) {
            return course[idx]._id;
        })
        .append("<div class='row'></div>");

    $('#CScourse_list .row').addClass(function (idx) {
        if (idx % 2 === 0) {
            return 'even_row';
        } else {
            return 'odd_row';
        }
    });

    $('#CScourse_list .row')
        .append('<div class="col-3 course_numb" ></div>')
        .append('<div class="col-5 title1"></div>')
        .append('<div class="col-4 buttonDiv"></div>')


    $('.course_numb')
        .append(function (idx) {
            return `<p class="ma">${course[idx].Course_num}</p>`;
        })

    $('.title1')
        .append(function (idx) {
            return `<p class="mo">${course[idx].Title}</p>`
        })

    $('.buttonDiv')
        .append(function (idx) {
            return `<div class="col-2 d-flex justify-content-end"><button class="btn btn-outline-primary taken-btn" onclick="showCourse(${idx})">Completed</button></div>`
        });


}


$.getJSON("/get_cs_courses").done(function (data) {
    // console.log(data)
    if (data.message === "success") {
        showList(data["data"]);
    }
});


let courses = []
let course_id = []
// console.log(likes)

function showCourse(idx) {
    console.log(courses[idx])
    // const courseID = $(this).val();
    const course=courses[idx]
    course_id.push(idx)
    $.post('/course_taken', {course}).done((data) =>{
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

function notTaken(){
    for (let i = 0; i < courses.length; i++) {
        if(!course_id.includes(i)){
            const course=courses[i]
            $.post('/not_taken', {course}).done((data) =>{
                console.log("this is data"+ data)
                if(data["message"] === "success"){
                    location.href = "pls.html"
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



