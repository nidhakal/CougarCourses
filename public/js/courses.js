function showList(course) {
    console.log("I am at showList");
    $('#course_list').empty().append(`<ul class="AllClasses"></ul>`);

    for (let i = 0; i < course.length; i++) {
        $('.AllClasses').append("<li class='AllCourse'></li>");
    }

    $('#course_list li')
        .attr("value", function (idx) {
            return course[idx]._id;
        })
        .append("<div class='row'></div>");

    $('#course_list .row').addClass(function (idx) {
        if (idx % 2 === 0) {
            return 'even_row';
        } else {
            return 'odd_row';
        }
    });

    $('#course_list .row')
        .append('<div class="col-1 course_no" ></div>')
        .append('<div class="col-3 title"></div>')
        .append('<div class="col-3 time"></div>')
        .append('<div class="col-1 days"></div>')
        .append('<div class="col-2 instructor"></div>')
        .append("<div class='col-2 d-flex justify-content-end buttonDiv'></div>");


    $('.course_no')
        .append(function (idx) {
            return `<p class="ma">${course[idx].Course_num}</p>`;
        })

    $('.title')
        .append(function (idx) {
            return `<p class="mo">${course[idx].Title}</p>`
        })
    $('.time')
        .append(function (idx) {
            return `<p class = "yea">${course[idx].Times}</p>`
        });
    $('.days')
        .append(function (idx) {
            return `<p class = "yea">${course[idx].Days}</p>`
        });
    $('.instructor')
        .append(function (idx) {
            return `<p class = "pri">${course[idx].Instructor}</p>`
        });

    $('.buttonDiv')
        .append(function (idx) {
            return `<input type="button" class="btn btn-secondary btn-slct" value="Select" onclick="schedule(${idx})">`
        });

    $('.button').on('click', function () {
        const carid = $(this).parents('li').attr("value");
        console.log(carid);
        location.href = "detail.html?car_id=" + carid;
    });

}


$.getJSON("/get_all_courses").done(function (data) {
    console.log(data)
    if (data.message === "success") {
        showList(data["data"]);
    }
});




$('.Make').on('click', function(){
    console.log("sort model")
    $.getJSON("/make").done(function (data) {
        showList(data["data"]);
    });
});

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

function searchCourses() {
    $.get("/get_courses_by_filter", {
        search_key: $('#search_box').val(),
    }).done((data) => {
        if (data.message === "success") {
            showList(data.data);
        }
    })
}

function Scheduler() {
   location.href = "/scheduler.html"
}

function schedule(i){
    if(i == 9){
        window.alert("you already have a class at this time");
    }
}
