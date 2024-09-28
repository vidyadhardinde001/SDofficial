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
      phone: '+91 7057272626',
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
          id: 1,
          title: "Mixer Plant Automation",
          description:
            "Scope of Work: Control Panel, PLC, VFD, Programming, SCADA Software Development, Commissioning of Plant. Integration of Instrumentation like Temperature, Weight etc.PID loop for temperature control.",
          image: "/assets/mixer.png",
          category: "Market research",
        },
        {
          id: 2,
          title: "Incinerators Plant Automation",
          description:
            "Scope Of Work : Turnkey Electric Project including Distribution Panel, Control Panel, Field wiring, PLC, VFD, SCADA with IOT functions Instrumentation integrated like Temperature , Pressure, Flow, Burner Control System etc. VFD Synchronization with change in temperature.",
          image: "/assets/incernator.png",
          category: "Market research",
        },
        {
          id: 3,
          title: "Water Treatment Plant Automation",
          description:
            "Scope Of Work: Turn Key Electrical Project, Distribution Panels, Control Panels, MCC Panels, Field wiring, PLC, VFD, SCADA, Remote I/O Instrumentation Integrated: Actuators for Valves, Ultrasonic Level Sensors, Ph, Turbidity, Flow, Pressure etc.",
          image: "/assets/treatment.png",
          category: "Branding strategies",
        },
        {
          id: 4,
          title: "Wire Stranding Machine",
          description:
            "Scope OF Supply: Control Panel, PLC, VFD, Field Wiring etc., Giving and Taking Command & Feedback to Robot ",
          image: "/assets/wirestranding.png",
          category: "Branding strategies",
        },
        {
          id: 5,
          title: "Special Purpose Machines",
          description:
            "Scope OF Supply: Control Panel, PLC, Servo, etc., Control Panel, Field wiring, PLC, VFD .Instrumentation integrated like Temperature , Pressure, Flow, Servo Motion Control System etc.",
          image: "/assets/specialpurpose.png",
          category: "Branding strategies",
        },
        {
          id: 6,
          title: "Robo Interfacing With SPMs",
          description:
            "Scope OF Supply: Control Panel, PLC, VFD, etc., VVFD Synchronization With Respect to Speed By Taking Encoder feedback .Instrumentation integrated like Temperature , Pressure,. ",
          image: "/assets/robo.png",
          category: "Branding strategies",
        },
        {
          id: 7,
          title: "Foundry Core Making Machine",
          description:
            "Scope OF Supply: Control Panel, PLC, VFD, etc., VVFD Synchronization With Respect to Speed By Taking Encoder feedback .Instrumentation integrated like Temperature , Pressure,. ",
          image: "/assets/foundary.png",
          category: "Branding strategies",
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
