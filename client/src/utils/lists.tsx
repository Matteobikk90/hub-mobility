import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

export const navbarLinks: {
  id: string;
  short?: string;
  name: string;
  path: string;
}[] = [
  {
    id: 'long',
    short: 'NLT',
    name: 'Noleggio Lungo Termine',
    path: 'noleggio-lungo-termine',
  },
  {
    id: 'short',
    short: 'NBT',
    name: 'Noleggio Breve Termine',
    path: 'noleggio-breve-termine',
  },
  {
    id: 'super',
    name: 'Super Car',
    path: 'super-car',
  },
  {
    id: 'carrozzeria',
    name: 'Carrozzeria / Cristalli',
    path: 'carrozzeria-cristalli',
  },
  {
    id: 'officina',
    name: 'Officina / Gommista',
    path: 'officina-gommista',
  },
  {
    id: 'assicurazioni',
    name: 'Assicurazioni',
    path: 'assicurazioni',
  },
];

export const locations: {
  city: string;
  phone: string;
  whatsapp: string;
  hours: string;
  email?: string;
}[] = [
  {
    city: 'Agenzia generale di Torino, Corso Filippo Brunelleschi 18, 10141',
    phone: '011 4110883',
    whatsapp: '',
    hours: '9:00 / 13:00 - 14:30 / 18:00',
    email: 'info@assieme2008.it',
  },
  {
    city: 'Torino, corso Brescia 53',
    phone: '011 2475559',
    whatsapp: '',
    hours: '9:00 / 13:00 - 14:30 / 18:00',
    email: 'info@assieme2008.it',
  },
  {
    city: 'Torino, via Saffi 15',
    phone: '011 4341310',
    whatsapp: '3452737900',
    hours: '9:00 / 13:00 - 14:30 / 18:00',
    email: 'info@assieme2008.it',
  },
  {
    city: 'Torino, via Bene Vagienna 19/A',
    phone: '011 3247995',
    whatsapp: '',
    hours: '9:00 / 13:00 - 14:30 / 18:00',
    email: 'info@assieme2008.it',
  },
  {
    city: 'Giaveno, viale Regina Elena 46-48, 10094',
    phone: '011 9375677',
    whatsapp: '',
    hours: '9:00 / 12:30 - 15:00 / 18:30; Sabato 9:00 / 12:00',
    email: 'info@assieme2008.it',
  },
  {
    city: 'Orbassano, via Frejus 37, 10043',
    phone: '011 9003462',
    whatsapp: '',
    hours: '9:00 / 13:00 - 14:30 / 18:00',
    email: 'info@assieme2008.it',
  },
  {
    city: 'Piossasco, via Ferrari 8, 10045',
    phone: '011 9064152',
    whatsapp: '',
    hours: '9:00 / 13:00 - 14:30 / 18:00',
    email: 'info@assieme2008.it',
  },
  {
    city: 'Beinasco, Strada Torino 36 c.c. "Le Fornaci", 10135',
    phone: '011 3275396',
    whatsapp: '',
    hours: '9:00 / 13:00 - 14:30 / 18:00',
    email: 'info@assieme2008.it',
  },
  {
    city: 'Borgaretto, Viale Giovanni XXIII 1/B, 10092',
    phone: '011 3581239',
    whatsapp: '',
    hours: '9:00 / 13:00 - 14:30 / 18:00',
    email: 'info@assieme2008.it',
  },
];

export const socials = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com',
    icon: <Facebook />,
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com',
    icon: <Instagram />,
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com',
    icon: <Linkedin />,
  },
  {
    name: 'X',
    url: 'https://www.x.com',
    icon: <Twitter />,
  },
];
