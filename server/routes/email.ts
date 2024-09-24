// src/routes/email.ts
import express, { Request, Response } from 'express';
import multer from 'multer';
import { sendEmail } from '../services/emailService';

const router = express.Router();
const upload = multer(); // Initialize multer for parsing `multipart/form-data`

// Email route to handle POST request and send email
router.post(
  '/send-email',
  upload.single('file'),
  async (req: Request, res: Response) => {
    const {
      nome,
      cognome,
      email,
      telefono,
      targa,
      modello,
      compagnia,
      indirizzo,
      cap,
      data,
      privacy,
    } = req.body;
    const file = req.file; // The uploaded file, if present

    try {
      // Call the email service to send the email
      await sendEmail({
        nome,
        cognome,
        email,
        telefono,
        targa,
        modello,
        compagnia,
        indirizzo,
        cap,
        data,
        privacy: privacy === 'true', // Convert privacy to boolean
        file: file
          ? { originalname: file.originalname, buffer: file.buffer }
          : undefined, // Pass the file data if it exists
      });
      res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to send email.' });
    }
  }
);

export default router;
