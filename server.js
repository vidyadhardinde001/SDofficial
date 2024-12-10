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
const allowedOrigins = ['https://siddhivinayakengineers.co.in','http://localhost:3000'];

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
const fetchTestimonialsAndUpdateDatabase = async () => {
  try {
    // Fetch the data from the API (replace with your actual URL)
    const response = await axios.get('https://script.googleusercontent.com/macros/echo?user_content_key=tlX-MehkG-lKwsHWM7UNM6twD8D9X0CJ6SLs6p6o3LUFwPiBcX59WKJHRVyjVP7MFznqBD-wJHv43Gz4_MwY9646o6ob-DCsm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnLFuKCgEWsBYL5ih1GLrw_2Aq1_nbXwB7Ez55Ds0baFPdUl_v-59Hr7ddiIy0rv5e0pIllKAJq6KhAu4ukK2YssAX6upMKUJlA&lib=M7zoeFMcLY1Nf1brj8mesNvZ1uKL4_q0K');
    
    // Check if the response and content data exists
    if (!response.data || !Array.isArray(response.data.content)) {
      throw new Error('Invalid or empty content data');
    }

    const apiData = response.data;

    // Ensure that we have data to map
    if (apiData.content.length === 0) {
      console.warn('No testimonials found in the API data');
      return; // Or handle empty data as needed
    }

    // Structure the data as per the required format
    const contentData = {
      section: 'testimonial',  // section is 'testimonial' for all testimonials
      content: {
        testimonialList: apiData.content.map(testimonial => ({
          name: testimonial.name,
          testimonial: testimonial.testimonial,
          avatarUrl: testimonial.avatarUrl
        }))
      }
    };

    // Delete any existing data for the Testimonials section and insert the updated data
    await Content.deleteMany({ section: 'testimonial' });
    await Content.create(contentData);

    console.log('Testimonials section updated from Google Sheets');
  } catch (error) {
    console.error('Error fetching Testimonials section data from API', error);
  }
};

const fetchServiceAndUpdateDatabase = async () => {
  try {
    // Fetch the data from the API (replace with your actual URL)
    const response = await axios.get('https://script.googleusercontent.com/macros/echo?user_content_key=-M5A8mgAzhrAvupKNAFJnhUAJUfUecg-FHDlY_icWAR8_LxM0Bnx2MgaOT8KkUPLU0MhgAFGONizlwhcUP2WmGEi0pGEns6tm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnNoX58wTQim0ILrxFrnQhDK3QdGrvJjxiQBZHnv9-GHTostibzxAxZOFK9eI4qiW375_kc9TEa_2YZYOTXb83n9wIzU36-wAq9z9Jw9Md8uu&lib=M2CSbHZUJlxxbq7HKujHoQ0oLBlaE9kY8');
    
    // Check if the response and content data exists
    if (!response.data || !Array.isArray(response.data.content)) {
      throw new Error('Invalid or empty content data');
    }

    const apiData = response.data;

    // Ensure that we have data to map
    if (apiData.content.length === 0) {
      console.warn('No service found in the API data');
      return; // Or handle empty data as needed
    }

    // Structure the data as per the required format
    const contentData = {
      section: 'service',  // section is 'testimonial' for all testimonials
      content: {
        serviceList: apiData.content.map(service => ({
          image:  service.image,
          name: service.name,
          description: service.description,
          read_more_path: service.read_more_path
        }))
      }
    };

    // Delete any existing data for the Testimonials section and insert the updated data
    await Content.deleteMany({ section: 'service' });
    await Content.create(contentData);

    console.log('service section updated from Google Sheets');
  } catch (error) {
    console.error('Error fetching service section data from API', error);
  }
};

const fetchClientsAndUpdateDatabase = async () => {
  try {
    // Fetch the data from the API (replace with your actual URL)
    const response = await axios.get('https://script.googleusercontent.com/macros/echo?user_content_key=GgB36ODmEYtmIg5BtVF5lJu4t3SKHzn6cK0Ch38hfxKrqvSyRbR3q6N8ZP94J4t9HdwVxqydxkhoku9s2CvY3GAf4Xuj_A3hm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnKbES-7aEjHyludqHW24UDeyqd_nTAp1qkKYGXDiRJ_E35GG8uU1tG7jjt5KmL-SKUp2DOLQ2inzdYcb2CkXj4F2sgp6fkp_uA&lib=MD3k01dNQnOzBmwiq3sDuNPZ1uKL4_q0K');
    
    // Check if the response and content data exists
    if (!response.data || !Array.isArray(response.data.content)) {
      throw new Error('Invalid or empty content data');
    }

    const apiData = response.data;

    // Ensure that we have data to map
    if (apiData.content.length === 0) {
      console.warn('No service found in the API data');
      return; // Or handle empty data as needed
    }

    // Structure the data as per the required format
    const contentData = {
      section: 'clients',  // section is 'testimonial' for all testimonials
      content: {
        clientsList: apiData.content.map(clients => ({
          src:  clients.src,
          alt: clients.alt,
          url: clients.url
        }))
      }
    };

    // Delete any existing data for the Testimonials section and insert the updated data
    await Content.deleteMany({ section: 'clients' });
    await Content.create(contentData);

    console.log('clients section updated from Google Sheets');
  } catch (error) {
    console.error('Error fetching service clients data from API', error);
  }
};

const fetchProductsAndUpdateDatabase = async () => {
  try {
    // Fetch the data from the API (replace with your actual URL)
    const response = await axios.get('https://script.googleusercontent.com/macros/echo?user_content_key=weFDPhGDwdgsi2HF7UBUWBYvIgBPOU-P_bVknHGk9cN8n5GInhqRoqb4ACxA8JEReFO9kJCYfzadpnNZtQLBUVvzS4IWC7K2m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnPGA1O4dOPqZXE6WR3R49X367kDH2zimDotuDPPe7A8kMNBl6DjA0J6clvv0ruCw9Hh-h_ajE_L6UKhGefqF4yupPWp7YHZz8w&lib=MQWkvGjJpPe-8AF3btGDFevZ1uKL4_q0K');
    
    // Check if the response and content data exists
    if (!response.data || !Array.isArray(response.data.content)) {
      throw new Error('Invalid or empty content data');
    }

    const apiData = response.data;

    // Ensure that we have data to map
    if (apiData.content.length === 0) {
      console.warn('No products found in the API data');
      return; // Or handle empty data as needed
    }

    // Structure the data as per the required format
    const contentData = {
      section: 'products',  // section is 'testimonial' for all testimonials
      content: {
        productsList: apiData.content.map(products => ({
          name:  products.name,
          image: products.image,
          details: products.details
        }))
      }
    };

    // Delete any existing data for the Testimonials section and insert the updated data
    await Content.deleteMany({ section: 'products' });
    await Content.create(contentData);

    console.log('products section updated from Google Sheets');
  } catch (error) {
    console.error('Error fetching service products data from API', error);
  }
};


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

const fetchAboutUsSectionAndUpdateDatabase = async () => {
  try {
    // Fetch the data from the API (replace with your actual URL)
    const response = await axios.get('https://script.googleusercontent.com/macros/echo?user_content_key=UKCaMEnrO0ZRu74BhggcSjMJsD1P4iKtLXMItNZa2zoh_rP_zqMSfiWXAomo6uv_cRHwdN_R8xCqGNFAGd_FU6dT1ZYbjZpSm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnPqMLSOjrwHZzK4mYvDdiHLGQJ-sHsTjH8OGIT8v3wDXNf-klVZLuzilP1FveXtpdQO_gPawdAHBn8CdIZfxHGG40252Hhbnptz9Jw9Md8uu&lib=MmfELZ3pWjpi07YwspSVeGEoLBlaE9kY8');
    const apiData = response.data;

    // Structure the data as per the Content model
    const aboutUsData = {
      section: 'aboutUsSection',
      content: {
        heading: apiData.content.heading,
        description: apiData.content.description,
        stats: apiData.content.stats,
        imageUrl: apiData.content.imageUrl,
        leadership: apiData.content.leadership
      }
    };

    // Delete any existing data for the About Us section and insert the updated data
    await Content.deleteMany({ section: 'aboutUsSection' });
    await Content.create(aboutUsData);

    console.log('About Us section updated from Google Sheets');
  } catch (error) {
    console.error('Error fetching About Us section data from API', error);
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
    pass: 'asnx dmwh azyy ruhm' // Replace with your email password
  }
});

// asnx dmwh azyy ruhm
// nvmn lylk fcjl cajk


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


cron.schedule('0 * * * *', async () => {
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
  await fetchAboutUsSectionAndUpdateDatabase();
  await fetchTestimonialsAndUpdateDatabase();
  await fetchServiceAndUpdateDatabase();
  await fetchClientsAndUpdateDatabase();
  await fetchProductsAndUpdateDatabase();
}

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  updateAllData(); // Run the update tasks after server starts
});