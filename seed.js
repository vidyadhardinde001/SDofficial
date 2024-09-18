const mongoose = require('mongoose');
const Content = require('./models/Content'); // Adjust the path if necessary

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

// Define the content to seed
const seedData = [
  {
    section: 'header',
    content: {
      logoUrl: '/assets/logo1.png', // Ensure this matches the path you use
      phone: '+91 7558341063',
      menuItems: [
        { href: '/', text: 'Home' },
        { href: '/projects', text: 'Projects' },
        { href: '/gallery', text: 'Gallery' },
        { href: '/contactus', text: 'Contact' },
        { href: '/aboutus', text: 'About Us' },
      ],
    },
  },
  {
    section: 'footer',
    content: {
      socialLinks: {
        twitter: 'https://twitter.com/',
        instagram: 'https://instagram.com/',
        linkedin: 'https://linkedin.com/',
      },
      navigationLinks: [ // Added navigation links
        { href: '/', text: 'Home' },
        { href: '/projects', text: 'Projects' },
        { href: '/gallery', text: 'Gallery' },
        { href: '/contactus', text: 'Contact' },
        { href: '/aboutus', text: 'About Us' },
      ],
      copyrightText: '&copy; 2024 Siddhivinayak Engineers, Inc. All rights reserved.',
    },
  },

  {
    section: 'projects', // Adding project data here
    content: {
      projectsList: [
        {
          title: "Mixer Plant Automation",
          description:
            "Scope of Work: Control Panel, PLC, VFD, Programming, SCADA Software Development, Commissioning of Plant. Integration of Instrumentation like Temperature, Weight etc. PID loop for temperature control.",
          imageUrl: "public/assets/mixer.png",
          category: "Industrial Automation",
        },
        {
          title: "Incinerators Plant Automation",
          description:
            "Scope Of Work: Turnkey Electric Project including Distribution Panel, Control Panel, Field wiring, PLC, VFD, SCADA with IOT functions. Instrumentation integrated like Temperature, Pressure, Flow, Burner Control System, etc.",
          imageUrl: "public/assets/incernator.png",
          category: "Waste Management",
        },
        // Add more projects as needed
      ],
    },
  },

];

// Function to seed the data
async function seed() {
  try {
    // Remove existing data
    await Content.deleteMany({});

    // Insert the new data
    await Content.insertMany(seedData);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database', error);
  } finally {
    // Close the connection
    mongoose.connection.close();
  }
}

// Run the seed function
seed();
