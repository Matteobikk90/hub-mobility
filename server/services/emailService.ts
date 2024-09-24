import nodemailer from 'nodemailer';

export const sendEmail = async (formData: {
  nome: string;
  cognome: string;
  email: string;
  telefono: string;
  targa: string;
  modello: string;
  compagnia: string;
  indirizzo: string;
  cap: string;
  data: string;
  privacy: boolean;
  file?: { originalname: string; buffer: Buffer }; // Optional file attachment
}) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Example: Gmail service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions: any = {
    from: process.env.EMAIL_USER,
    to: 'recipient@example.com', // The recipient email address
    subject: `New Contact Form Submission from ${formData.nome} ${formData.cognome}`,
    text: `
      You received a new contact form submission.

      Name: ${formData.nome} ${formData.cognome}
      Email: ${formData.email}
      Phone: ${formData.telefono}
      License Plate: ${formData.targa}
      Model: ${formData.modello}
      Insurance Company: ${formData.compagnia}
      Address: ${formData.indirizzo}
      Postal Code: ${formData.cap}
      Date: ${formData.data}
      Privacy Agreement: ${formData.privacy ? 'Agreed' : 'Not Agreed'}
    `,
  };

  // If there is a file (image) attached, include it in the email
  if (formData.file) {
    mailOptions.attachments = [
      {
        filename: formData.file.originalname,
        content: formData.file.buffer,
      },
    ];
  }

  // Send email using the transporter
  return transporter.sendMail(mailOptions);
};
