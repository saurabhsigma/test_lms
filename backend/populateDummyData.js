const mongoose = require('mongoose');
const Course = require('./models/Course');
const Topic = require('./models/Topic');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const createDummyData = async () => {
  try {
    for (let classNumber = 1; classNumber <= 10; classNumber++) {
      // Create a new course for each class
      const course = new Course({
        title: `Course for Class ${classNumber}`,
        description: `This is the course description for Class ${classNumber}.`,
        class: classNumber, // Add the class number here
      });

      await course.save();

      // Create 5 topics for each course
      for (let i = 1; i <= 5; i++) {
        const topic = new Topic({
          title: `Topic ${i} for Class ${classNumber}`,
          youtubeLink: `https://youtube.com/watch?v=class${classNumber}topic${i}`,
          textContent: `This is the text content for Topic ${i} in Class ${classNumber}.`,
          description: `Description for Topic ${i} in Class ${classNumber}.`,
          iframeLink: `https://example.com/class${classNumber}/topic${i}`,
        });

        await topic.save();

        // Add each topic to the course
         course.topics.push(topic._id);
      }

      // Save the course with topics
      await course.save();

      console.log(`Added course and topics for Class ${classNumber}`);
    }

    console.log('Dummy data population complete.');
  } catch (error) {
    console.error('Error creating dummy data:', error);
  } finally {
    mongoose.connection.close();
  }
};

createDummyData();
