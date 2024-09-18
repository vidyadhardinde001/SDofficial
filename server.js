const express = require('express');
const mongoose = require('mongoose');
const Content = require('./models/Content'); // Ensure the path is correct

const app = express();
const port = 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/siddhivinayak', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Failed to connect to MongoDB', err);
});

// Middleware to parse JSON
// app.use(express.json());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public')); // This will serve static files from the 'public' directory


// Route to get content by section (header or footer)
app.get('/api/content/:section', async (req, res) => {
  try {
    const section = req.params.section;
    const content = await Content.findOne({ section });

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
