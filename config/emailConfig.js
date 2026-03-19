import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

let transporter;
try {
  // Configure transporter
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtpout.secureserver.net", // Default to Gmail if not provided
    port: process.env.EMAIL_PORT || 587, // Default to 587 for TLS
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your email password or app password
    },
  });

  // Verify transporter configuration
  transporter.verify((error, success) => {
    if (error) {
      console.error("❌ Error sending email to client:", error.message);
    } else {
      console.log("SMTP Transporter is configured and ready to send emails!");
    }
  });
} catch (error) {
  console.error("Error configuring transporter:", error.message);
  throw error; // Optional: Exit process if email configuration fails
}

export default transporter;
