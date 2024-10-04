// pages/api/contact.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, name, message } = req.body; // Get sender's email, name, and message

    // Configure your own email transporter (authenticated by your server)
    const transporter = nodemailer.createTransport({
      service: 'gmail', // You can use another service
      auth: {
        user: process.env.EMAIL_USER,  // Your server's email credentials
        pass: process.env.EMAIL_PASS,  // Use environment variables for security
      },
    });

    // Email options (sender's email can be part of the email content, not the authenticated user)
    const mailOptions = {
      from: process.env.EMAIL_USER, // Email from your server
      to: 'receiver@example.com',   // The recipient's email (your email)
      subject: `New contact form submission from ${name}`, // Customize subject
      text: `You have received a new message from ${name} (${email}):\n\n${message}`, // Sender's email included in the body
    };

    try {
      // Send the email
      await transporter.sendMail(mailOptions);
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ success: false, error: 'Failed to send email' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
