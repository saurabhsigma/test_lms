const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const User = require('../models/User');

// Add a course
router.post('/add-course', async (req, res) => {
    const { title, description, classNumber } = req.body;

    if (!title || !description || !classNumber) {
        return res.status(400).json({ message: 'Please provide all fields' });
    }

    const course = new Course({
        title,
        description,
        class: classNumber,
    });

    await course.save();
    res.status(201).json(course);
});

// View courses based on the user's class
router.get('/view-courses', async (req, res) => {
    const { classNumber } = req.query;

    const courses = await Course.find({ class: classNumber }).populate('topics');
    res.json(courses);
});

module.exports = router;
