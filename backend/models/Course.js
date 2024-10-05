const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    topics: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic'
    }],
    class: {
        type: Number,
        required: true, // Class that the course is linked to
    }
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
