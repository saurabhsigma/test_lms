const express = require('express');
const router = express.Router();
const Topic = require('../models/Topic');
const Course = require('../models/Course');

// Add a topic to a course
router.post('/add-topic', async (req, res) => {
    const { courseId, title, youtubeLink, textContent, description, iframeLink } = req.body;

    if (!courseId || !title || !youtubeLink || !textContent || !description || !iframeLink) {
        return res.status(400).json({ message: 'Please provide all fields' });
    }

    const topic = new Topic({
        title,
        youtubeLink,
        textContent,
        description,
        iframeLink,
    });

    await topic.save();

    const course = await Course.findById(courseId);
    course.topics.push(topic._id);
    await course.save();

    res.status(201).json(topic);
});

// View topics in a course
router.get('/view-topics/:courseId', async (req, res) => {
    const { courseId } = req.params;

    const course = await Course.findById(courseId).populate('topics');
    if (!course) {
        return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course.topics);
});

module.exports = router;
