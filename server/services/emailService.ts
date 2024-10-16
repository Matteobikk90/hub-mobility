import nodemailer from 'nodemailer';

export const sendEmail = async (formData: {
  sectinId: string;
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
  file?: { originalname: string; buffer: Buffer }; // Optional file attachment
}) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465, // Use port 465 for SSL
    secure: true, // true for SSL
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions: any = {
    from: process.env.EMAIL_USER,
    to: 'recipient@example.com', // The recipient email address
    subject: `${formData.sectinId} - ${formData.nome} ${formData.cognome}`,
    text: `
      Di sguito i dettagli del modulo inviato:

      Nome Cognome: ${formData.nome} ${formData.cognome}
      Email: ${formData.email}
      Telefono: ${formData.telefono}
      Targa: ${formData.targa}
      Modello: ${formData.modello}
      Compagnia assicurativa: ${formData.compagnia}
      Indirizzo: ${formData.indirizzo}
      Codice postale: ${formData.cap}
      Data: ${formData.data}
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
