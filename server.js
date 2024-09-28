const express = require('express');
const mongoose = require('mongoose');
const Content = require('./models/Content'); // Ensure the path is correct
const axios = require('axios');

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
// app.use(express.static('public')); // This will serve static files from the 'public' directory

// const fetchDataAndUpdateDatabase = async () => {
//   try {
//     // Fetch data from the Google Sheets API
//     const response = await axios.get('https://script.googleusercontent.com/macros/echo?user_content_key=8YvaTfd3V_89kCPXl7DUO_jHPArmNmYeBRiRMsI-hAHZKs0LhkjQazkZyvGamlY-aA4nS4keXAavqQfjn9vX2mg1rJ5Cn4MVm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnBnV1TslBD8CxlmVE9u3evWfF1GXw_KHyfXkWYYt9CYFVnR92-qieb8jHbj1wsQVfR9afHfui3JKrJxwE5HGcJYXJ5K4j08g4g&lib=MdeKoPvhrvM-qhZvace2Bf_Z1uKL4_q0K');
    
//     const apiData = response.data; // Get data from response

//     // Delete existing data
//     await Content.deleteMany({});

//     // Insert new data into MongoDB
//     await Content.insertMany(apiData);

//     console.log('Database updated with Google Sheets data');
//   } catch (error) {
//     console.error('Error fetching data from Google Sheets API', error);
//   }
// };


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
  // fetchDataAndUpdateDatabase();
});