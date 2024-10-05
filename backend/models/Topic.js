const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    youtubeLink: {
        type: String,
        required: true,
    },
    textContent: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    iframeLink: {
        type: String,
        required: true,
    }
});

const Topic = mongoose.model('Topic', topicSchema);
module.exports = Topic;
