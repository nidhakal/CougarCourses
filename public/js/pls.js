function showList(course) {
    console.log("I am at showList");
    $('#PLScourse_list').empty();

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
        .append('<div class="col-4 check"><input type="checkbox" id="flexCheckDefault" name="vehicle1" value="Bike">\n' +
            '<label class="form-check-label" for="flexCheckDefault">Completed</label>')

    $('.course_name')
        .append(function (idx) {
            return `<p class="ma">${course[idx].name}</p>`;
        })
    $('.att')
        .append(function (idx) {
            return `<p class="mo">${course[idx].attribute}</p>`
        })

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


$.getJSON("/get_pls_courses").done(function (data) {
    console.log(data)
    if (data.message === "success") {
        showList(data["data"]);
    }
});

