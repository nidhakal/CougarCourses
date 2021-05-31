const mongoose = require('mongoose');

const fs = require('fs');
const rawdata = fs.readFileSync(__dirname + "/data.json");
jsonList = JSON.parse(rawdata);

const csmajordata = fs.readFileSync(__dirname + "/dataCSmajor.json");
jsonList1 = JSON.parse(csmajordata);

const plsdata = fs.readFileSync(__dirname + "/pls.json");
jsonList2 = JSON.parse(plsdata);



mongoose.connect('mongodb://localhost:27017/courseDB', {useNewUrlParser: true}, function () {
    console.log("db connected successful!")
});

const courseSchema = new mongoose.Schema({
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
    Room: String,
})


const plsSchema = new mongoose.Schema({
    Name: String,
    Attribute: String,
})


const Course = mongoose.model('Course', courseSchema);
const CScourse = mongoose.model('CScourse', courseSchema);
const PLScourse = mongoose.model('PLScourse', plsSchema);

courseList = []
CScourseList = []
PLScourseList = []

jsonList.forEach(function (course) {
    courseList.push({
        "CRN": course["CRN"],
        "Course_num": course["Course #"],
        "Sc": course["Sc"],
        "Title": course["Title"],
        "Attribute": course["Attribute"],
        "Units": course["Units"],
        "CAP": course["CAP"],
        "Enr": course["Enr"],
        "Instructor": course["Instructor"],
        "Modality": course["Modality"],
        "Days": course["Days"],
        "Times": course["Times"],
        "Room": course["Room"],
    });
});

jsonList1.forEach(function (course) {
    CScourseList.push({
        "CRN": course["CRN"],
        "Course_num": course["Course #"],
        "Sc": course["Sc"],
        "Title": course["Title"],
        "Attribute": course["Attribute"],
        "Units": course["Units"],
        "CAP": course["CAP"],
        "Enr": course["Enr"],
        "Instructor": course["Instructor"],
        "Modality": course["Modality"],
        "Days": course["Days"],
        "Times": course["Times"],
        "Room": course["Room"],
    });
});

jsonList2.forEach(function (course) {
    PLScourseList.push({
        "Name": course["Name"],
        "Attribute": course["Attribute"]
    });
});



Course.insertMany(courseList, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("All data saved");
        mongoose.connection.close();
    }
});

CScourse.insertMany(CScourseList, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("All data saved");
        mongoose.connection.close();
    }
});

PLScourse.insertMany(PLScourseList, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("All data saved");
        mongoose.connection.close();
    }
});

