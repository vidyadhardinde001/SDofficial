const express = require('express');
const mongoose = require('mongoose');
const Content = require('./models/Content'); // Ensure the path is correct
const axios = require('axios');
const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.local' });
const cors = require('cors');
const cron = require('node-cron');


const app = express();
const port = 10000;
app.use(express.json());
const allowedOrigins = ['https://s-dofficial-53ll.vercel.app'];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      // Origin not allowed
      return callback(new Error('CORS policy: Not allowed by CORS'), false);
    }
    return callback(null, true);
  }
}));

console.log('MongoDB URI:', process.env.MONGODB_URI); // Add this line


mongoose.connect(process.env.MONGODB_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // Timeout after 30 seconds instead of 10
  socketTimeoutMS: 45000,
})

  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
  });


mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Failed to connect to MongoDB', err);
});


const fetchDataAndUpdateDatabase = async () => {
  try {
    const response = await axios.get('https://script.googleusercontent.com/macros/echo?user_content_key=jWiOjkrf2ctn2AgdYjCviqqnE6ug9Aidd_OROLJcY_0LmgfZYVE-7st50YzWi5_2L3aAFqee5F2Ppmd-pptFj4drARAV7L3xm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnNsCMzeldO4Xb_scTkAnMat5qCrKwegdmpVCvGZHadmqfYT3XWzQJwz-y7I4-Gds87a84TYTPQIyHJ2wmYtgjIjbkze09Tcvtg&lib=MLI_HfzysNsvwOtnrQy7NCvZ1uKL4_q0K'); // Replace with your actual URL
    
    const apiData = response.data; // Get data from response

    // Validate the response structure
    // if (!apiData || !apiData.projectsList) {
    //   throw new Error("Invalid data structure from Google Sheets");
    // }

    // Prepare the content data
    const contentData = {
      section: 'projects',
      content: {
        projectsList: apiData.content.projectsList // Directly use the projectsList
      }
    };

    // Delete existing projects data
    await Content.deleteMany({ section: 'projects' });

    // Insert new content data into MongoDB
    await Content.create(contentData);

    console.log('Database updated with Google Sheets data');
  } catch (error) {
    console.error('Error fetching data from Google Sheets API', error);
  }
};

const fetchIndustriesDataAndUpdate = async() => {
  try{
    const response = await axios.get('https://script.googleusercontent.com/macros/echo?user_content_key=ZeAn9R4Rt7wAjmI2NaAXATp7GW7PjXY4ShiwTwVGBELhkMdBbvId0IdjPFUWRcoW8oo3v0vtTEjhDOa1-UEkteUFaRREl5hVm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnBSm_USY4GSQ8Tca1sNRFpaiQ2g2GjE9ijJtY7fOPRD6yfShoFAtt0-kav1ZSmGKDIz4eD8bdqOgW7FGS2Wq8KwuVInP8lnoBQ&lib=MvLWOAv6XvPFl5sKePnYpffZ1uKL4_q0K');
    const apiData = response.data;

    const contentData = {
      section: 'industries',
      content:{
        IndustryList: apiData.content.IndustryList
      }
    };

    await Content.deleteMany({section: 'industries'});

    await Content.create(contentData);

    console.log('Industries data updated with google sheet');
  } catch (error){
    console.error('Error fetching data from Google Sheets API', error);
  }

};


const fetchGalleryAndUpdateDatabase = async () => {
  try {
    const response = await axios.get('https://script.googleusercontent.com/macros/echo?user_content_key=90rFnfDXzfZm6VlFKZkbcLc87LmuwCkBUWm11sfK4PCAddJzlknvEpZwhwhiYr9SIjY7P7jNyC7ZKCtrP-PL9B3qKtdSVnX3m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnJTwMJZnWSxTM3TdZybefEV_oyLs55Xlori6jebIPmUq1k1Kole8MtZQuK9A_3FJIh41psCCXoaBR0iCy3D9Iai_2Ybj-VDT3A&lib=MCbCGb8vc5tMgqiebKsQrMPZ1uKL4_q0K'); // Replace with the correct URL for gallery
    const apiData = response.data;

    const galleryData = {
      section: 'gallery',
      content: {
        galleryImages: apiData.content.galleryImages
      }
    };

    // Delete existing gallery data and insert the updated data
    await Content.deleteMany({ section: 'gallery' });
    await Content.create(galleryData);

    console.log('Gallery data updated from Google Sheets or API');
  } catch (error) {
    console.error('Error fetching gallery data from API', error);
  }
};

const fetchHeroSectionAndUpdateDatabase = async () => {
  try {
    const response = await axios.get('https://script.googleusercontent.com/macros/echo?user_content_key=KJ0jrtflLnowUrnX1oa9gpRoehz3RhcouVR5Ek9sz3UbFXN0zfba5bB7xzBjfFZ7erXSvHOGyZAdArWipVZ3AHBEguUlQFw7m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnPSes8K7rVC4cBQF2LqNz5wTxp2unB-jQa368GhxUbYHGxZqVBdM0i6thF3ZyONz4XQJmmtVdaPpBUVnQgDnpzCJuDlzVxqDkQ&lib=MhOghx2ivbIsU-792mgpTLfZ1uKL4_q0K'); // Replace with actual Google Sheets API URL
    const apiData = response.data;

    const heroData = {
      section: 'heroSection',
      content: {
        welcomeMessage: apiData.content.welcomeMessage,
        mainHeading: apiData.content.mainHeading,
        subHeading: apiData.content.subHeading,
        videoUrl: apiData.content.videoUrl,
      }
    };

    // Delete existing hero data and insert the updated data
    await Content.deleteMany({ section: 'heroSection' });
    await Content.create(heroData);

    console.log('Hero section updated from Google Sheets');
  } catch (error) {
    console.error('Error fetching Hero section data from API', error);
  }
};

const fetchValueToProductAndUpdateDatabase = async () => {
  try {
    const response = await axios.get('https://script.googleusercontent.com/macros/echo?user_content_key=jVdIyl3bRGIyD_004jotgsni8PGYzKqzeeLkS101oznRIuj6RSNJH_0ppqqt4FfCGC0fG2o3z6jSp03xEhni6XXT5GghD_-xm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnEZGjWghMy4ALXbj4R6SY44yPFBeMgapBi6ZB4Xr_9Wyv2O6My-X2UriQlroIpkE5jxX5jBqFqzSiwuVZ1mXrk0x4IcFphKShw&lib=Mbw0ZJRqBK6WfKp-y_t1HJPZ1uKL4_q0K'); // Replace with your actual URL for Value to Product
    const apiData = response.data;

    const valueToProductData = {
      section: 'valuetoProduct',
      content: {
        valueList: apiData.content // Adjust based on your API response structure
      }
    };

    await Content.deleteMany({ section: 'valuetoProduct' });
    await Content.create(valueToProductData);

    console.log('Value to Product data updated from Google Sheets or API');
  } catch (error) {
    console.error('Error fetching Value to Product data from API', error);
  }
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'adityakhandare8320@gmail.com', // Replace with your email
    pass: 'nvmn lylk fcjl cajk' // Replace with your email password
  }
});


app.post('/api/contact', async (req, res) => {
  const { name, email, phone, message } = req.body;

  // Email options
  const mailOptions = {
    from: email, // Your email address
    to: 'adityakhandare8320@gmail.com', // Your email address to receive the message
    replyTo: email, // User's email address for replies
    subject: `Contact Form Submission from ${name}`, // Subject line
    text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nMessage: ${message}` // Email body
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending message' });
  }
});


cron.schedule('* * * * *', async () => {
  console.log('Running scheduled data update task...');
  await updateAllData();  // Call your update function periodically
});

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

async function updateAllData() {
  await fetchDataAndUpdateDatabase();
  await fetchGalleryAndUpdateDatabase();
  await fetchHeroSectionAndUpdateDatabase();
  await fetchValueToProductAndUpdateDatabase();
  await fetchIndustriesDataAndUpdate();
}

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  updateAllData(); // Run the update tasks after server starts
});