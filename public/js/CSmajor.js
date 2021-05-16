function showList(course) {
    console.log("I am at showList");
    $('#CScourse_list').empty();

    for (let i = 0; i < course.length; i++) {
        $('#CScourse_list').append("<li class='list-group-item'></li>");
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
        .append('<div class="col-4 course_numb" ></div>')
        .append('<div class="col-4 title1"></div>')
        .append('<div class="col-4 check"><input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">\n' +
            '<label for="vehicle1">Completed </label><br></div>')




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
            return `<input type="button" class="btn btn-outline-primary button" value="Show More">`
        });

    $('.button').on('click', function () {
        const carid = $(this).parents('li').attr("value");
        console.log(carid);
        location.href = "detail.html?car_id=" + carid;
    });

}


$.getJSON("/get_cs_courses").done(function (data) {
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