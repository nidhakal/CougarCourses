function showList(course) {
    console.log("I am at showList");
    $('#course_list').empty();

    for (let i = 0; i < course.length; i++) {
        $('#course_list').append("<li class='list-group-item'></li>");
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
        .append('<div class="col-3 course_no" ></div>')
        .append('<div class="col-3 title"></div>')
        .append('<div class="col-2 time"></div>')
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
    $('.instructor')
        .append(function (idx) {
            return `<p class = "pri">${course[idx].Instructor}</p>`
        });

    $('.buttonDiv')
        .append(function (idx) {
            return `<input type="button" class="btn btn-outline-primary button" value="Show More">`
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


$('.Model').on('click', function(){
    console.log("sort model")
    $.getJSON("/model").done(function (data) {
        showList(data["data"]);
    });
});


$('.Year').on('click', function(){
    console.log("sort model")
    $.getJSON("/year").done(function (data) {
        showList(data["data"]);
    });
});

$('.Price').on('click', function(){
    console.log("sort model")
    $.getJSON("/price").done(function (data) {
        showList(data["data"]);
    });
});