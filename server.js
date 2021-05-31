//npm i express body-parser mongoose
//npm i express-session passport passport-local passport-local-mongoose

const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//Add sessions
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

//Configure body-parser and set static dir path.
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

//Initialize passport
app.use(session({
    secret: "alongsecretonlyiknow_asdlfkhja465xzcew523",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//Configure Mongoose
mongoose.connect('mongodb://localhost:27017/courseDB', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set("useCreateIndex", true);


const courseSchema = {
    CRN: String,
    Course_num: String,
    Sc: String,
    Title: String,
    Attribute: String,
    Units: String,
    CAP:String,
    Enr: String,
    Instructor: String,
    Modality: String,
    Days: String,
    Times: String,
    Room: String
};

const plsSchema = new mongoose.Schema({
    Name: String,
    Attribute: String,
})


const Course = mongoose.model('Course', courseSchema);
const CScourse = mongoose.model('CScourse', courseSchema);
const PLScourse = mongoose.model('PLScourse', plsSchema);

const userSchema= new mongoose.Schema(
    {
        username:{
            type: String,
            unique: true,
            require: true,
            minlength: 3
        },
        password:{
            type: String,
            require: true
        },
        fullname:{
            type: String,
            require: true
        },
        url:{
            type: String
        },
        courses_taken: [
            {
                CRN: String,
                Course_num: String,
                Sc: String,
                Title: String,
                Attribute: String,
                Units: String,
                CAP:String,
                Enr: String,
                Instructor: String,
                Modality: String,
                Days: String,
                Times: String,
                Room: String
            }
        ],
        courses_nottaken: [
            {
                CRN: String,
                Course_num: String,
                Sc: String,
                Title: String,
                Attribute: String,
                Units: String,
                CAP:String,
                Enr: String,
                Instructor: String,
                Modality: String,
                Days: String,
                Times: String,
                Room: String
            }
        ],
        PLScourses_taken: [
            {
                Name: String,
                Attribute: String
            }
        ],
        PLScourses_nottaken: [
            {
                Name: String,
                Attribute: String
            }
        ]
    }
);

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

//Configure passport
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.listen(3000, function () {
    console.log("server started at 3000");
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/.html");
});

app.get('/get_current_user', function (req,res){
    if(req.isAuthenticated()){
        console.log(req.user);
        res.send({
            message:"success",
            data:req.user
        });
    } else{
        res.send({
            message: "no login",
            data:{}
        })
    }
});

app.get("/get_all_courses", function (req, res) {
    // console.log(courseSchema)
    Course.find(function (err, data) {
        console.log(data)
        if (err) {
            res.send({
                "message": "error",
                "data": []
            });
        } else {
            res.send({
                "message": "success",
                "data": data
            })
        }
    });
});

app.get("/get_cs_courses", function (req, res) {
    // console.log(courseSchema)
    CScourse.find(function (err, data) {
        console.log(data)
        if (err) {
            res.send({
                "message": "error",
                "data": []
            });
        } else {
            res.send({
                "message": "success",
                "data": data
            })
        }
    });
});

app.get("/get_pls_courses", function (req, res) {
    // console.log(courseSchema)
    PLScourse.find(function (err, data) {
        console.log(data)
        if (err) {
            res.send({
                "message": "error",
                "data": []
            });
        } else {
            res.send({
                "message": "success",
                "data": data
            })
        }
    });
});



app.get('/course', function (req, res) {
    res.sendFile(__dirname + "/public/courses.html");
});
app.get('/majorcourse', function (req, res) {
    res.sendFile(__dirname + "/public/CSmajor.html");
});

app.get('/plscourse', function (req, res) {
    res.sendFile(__dirname + "/public/pls.html");
});

app.get('/get_movie_by_id', function (req, res) {
    Movie.findOne({"_id": req.query.movie_id}, function (err, data) {
        if (err) {
            res.send({
                "message": "error",
                "data": {}
            });
        } else {
            res.send({
                "message": "success",
                "data": data
            })
        }
    });
});

app.get('/register', (req, res) => {
    if (req.query.error) {
        res.redirect("/register.html?error=" + req.query.error);
    } else {
        res.redirect("/register.html");
    }
});

app.post('/register', (req, res) => {
    const newUser={username: req.body.username, fullname: req.body.fullname, url:req.body.url
    };
    User.register(
        newUser,
        req.body.password,
        function(err, user){
            if(err){
                console.log(err);
                res.redirect("/register?error="+err);
            }else{
                //write into cookies, authenticate the requests
                const authenticate = passport.authenticate("local");
                authenticate(req,res, function (){
                    res.redirect("/CSmajor.html")
                });
            }
        }
    );

});


app.get('/login', (req, res) => {
    if (req.query.error) {
        res.redirect("/login.html?error=" + req.query.error);
    } else {
        res.redirect("/login.html");
    }
});

app.post('/login', (req, res) => {
    const user=new User({
        username:req.body.username,
        password:req.body.password
    });
    req.login(
        user,
        function(err){
            if(err){
                console.log(err);
                res.redirect('login?error=Invalid username or password');
            }else{
                const authenticate = passport.authenticate(
                    "local",
                    {
                        successRedirect:"/",
                        failureRedirect:"/login?error=Username and password don't match"
                    })
                authenticate(req, res);
            }

        }
    )
});


app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});


app.get("/edit", (req, res) => {
    //A page can be viewed only after login
    console.log(res.isAuthenticated());
    if(req.isAuthenticated()){
        res.sendFile(__dirname + "/src/movie_edit.html");
    }else{
        res.sendFile(__dirname + "/src/movie_edit.html");
    }
});


app.post('/course_taken', (req, res) => {
    if (req.isAuthenticated()) {
        const course_id=req.body.CRN;
        const course = {
            CRN: req.body.course.CRN,
            Course_num: req.body.course.Course_num,
            Sc: req.body.course.Sc,
            Title: req.body.course.Title,
            Attribute: req.body.course.Attribute,
            Units: req.body.course.Units,
            CAP:req.body.course.CAP,
            Enr: req.body.course.Enr,
            Instructor: req.body.course.Instructor,
            Modality: req.body.course.Modality,
            Days: req.body.course.Days,
            Times: req.body.course.Times ,
            Room: req.body.course.Room
        }
        console.log(course);
        User.updateOne(
            {_id: req.user._id, 'courses_taken.CRN': {$ne: course.CRN}},
            {
                $push: {courses_taken: course}
            },
            {},
            (err, info) => {
                if (err) {
                    res.send({
                        message: "database error"
                    });
                } else {
                    res.send({
                        message: "success"
                    })
                }})
    } else {
        res.send({
            message: "login required",
            data: ("/login")
        })
    }
});


app.post('/not_taken', (req, res) => {
    if (req.isAuthenticated()) {
        const course_id=req.body.CRN;
        const course = {
            CRN: req.body.course.CRN,
            Course_num: req.body.course.Course_num,
            Sc: req.body.course.Sc,
            Title: req.body.course.Title,
            Attribute: req.body.course.Attribute,
            Units: req.body.course.Units,
            CAP:req.body.course.CAP,
            Enr: req.body.course.Enr,
            Instructor: req.body.course.Instructor,
            Modality: req.body.course.Modality,
            Days: req.body.course.Days,
            Times: req.body.course.Times ,
            Room: req.body.course.Room
        }
        console.log(course);
        User.updateOne(
            {_id: req.user._id, 'courses_nottaken.CRN': {$ne: course.CRN}},
            {
                $push: {courses_nottaken: course}
            },
            {},
            (err, info) => {
                if (err) {
                    res.send({
                        message: "database error"
                    });
                } else {
                    res.send({
                        message: "success"
                    })
                }})
    } else {
        res.send({
            message: "login required",
            data: ("/login")
        })
    }
});


app.post('/PLS_course_taken', (req, res) => {
    if (req.isAuthenticated()) {
        // const course_id=req.body.CRN;
        const course = {
            Name: req.body.course.Name,
            Attribute: req.body.course.Attribute
        }
        console.log(course);
        User.updateOne(
            {_id: req.user._id, 'PLScourses_taken.Name': {$ne: course.Name}},
            {
                $push: {PLScourses_taken: course}
            },
            {},
            (err, info) => {
                if (err) {
                    res.send({
                        message: "database error"
                    });
                } else {
                    res.send({
                        message: "success"
                    })
                }})
    } else {
        res.send({
            message: "login required",
            data: ("/login")
        })
    }
});


app.post('/PLS_not_taken', (req, res) => {
    if (req.isAuthenticated()) {
        // const course_id=req.body.CRN;
        const course = {
            Name: req.body.course.Name,
            Attribute: req.body.course.Attribute
        }
        console.log(course);
        User.updateOne(
            {_id: req.user._id, 'PLScourses_nottaken.Name': {$ne: course.Name}},
            {
                $push: {PLScourses_nottaken: course}
            },
            {},
            (err, info) => {
                if (err) {
                    res.send({
                        message: "database error"
                    });
                } else {
                    res.send({
                        message: "success"
                    })
                }})
    } else {
        res.send({
            message: "login required",
            data: ("/login")
        })
    }
});