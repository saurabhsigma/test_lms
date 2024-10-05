const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
    classNumber: { type: Number, required: true, unique:true}, //class 1 to 10
    courses: [{type: mongoose.Schema.Types.ObjectId, ref: "Course"}]
})

module.exports = mongoose.model('Class', classSchema);