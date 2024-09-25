import { ServicesId } from '@/types/services.types';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

export const navbarLinks: {
  id: string;
  name: string;
  path: string;
}[] = [
  {
    id: 'long',
    name: 'Noleggio Lungo Termine',
    path: 'noleggio-lungo-termine',
  },
  {
    id: 'short',
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

export const serviceData: Record<
  ServicesId,
  {
    videoUrl: string;
    title: string;
    subtitle: string;
    description: string;
    formTitle: string;
    formText: string;
  }
> = {
  'carrozzeria-cristalli': {
    videoUrl: '/assets/videos/services/carrozzeria-video.mp4',
    title: 'Carrozzeria / Cristalli',
    subtitle: 'Servizi di Carrozzeria e Riparazione Cristalli',
    description:
      "Scopri l'arte della carrozzeria al Gruppo Maestri, dove ogni veicolo viene trattato con maestria e attenzione. Da incidenti minori alle riparazioni più complesse, i nostri esperti offrono un restauro impeccabile. Rinnova la tua auto con la precisione e l'eccellenza che solo noi possiamo garantire.",
    formTitle: 'Siamo qui per aiutarti!',
    formText: 'Denuncia qui il tuo sinistro.',
  },
  'officina-gommista': {
    videoUrl: '/assets/videos/services/officina-video.mp4',
    title: 'Officina / Gommista',
    subtitle: 'Riparazioni Auto e Servizi di Gommista',
    description:
      'Ci occupiamo di riparazioni auto e manutenzione gomme per ogni tipo di veicolo.',
    formTitle: 'Siamo qui per aiutarti!',
    formText: 'Prenota qui il tuo tagliando o il cambio gomme',
  },
  assicurazioni: {
    videoUrl: '/assets/videos/services/assicurazioni-video.mp4',
    title: 'Assicurazioni',
    subtitle: 'Servizi Assicurativi Personalizzati',
    description:
      'Forniamo consulenza e soluzioni assicurative su misura per ogni esigenza.',
    formTitle: 'Siamo qui per aiutarti!',
    formText: 'Richiedi qui il tuo preventivo auto',
  },
};

export const insuranceCompanies = [
  { id: 'allianz', name: 'Allianz' },
  { id: 'allianz-direct', name: 'Allianz Direct' },
  { id: 'allianz-viva', name: 'Allianz Viva' },
  { id: 'assimoco', name: 'Assimoco' },
  { id: 'axa', name: 'AXA' },
  { id: 'creditras', name: 'CreditRas' },
  { id: 'fit2you', name: 'Fit2you' },
  { id: 'generali', name: 'Generali' },
  { id: 'groupama-assicurazioni', name: 'Groupama Assicurazioni' },
  { id: 'gruppo-cattolica', name: 'Gruppo Cattolica' },
  { id: 'intesa-sanpaolo-assicura', name: 'Intesa SanPaolo Assicura' },
  { id: 'italiana-assicurazioni', name: 'Italiana Assicurazioni' },
  { id: 'itas-assicurazioni', name: 'Itas Assicurazioni' },
  { id: 'prima-assicurazioni', name: 'Prima Assicurazioni' },
  { id: 'quixa', name: 'Quixa' },
  { id: 'reale-mutua', name: 'Reale Mutua' },
  { id: 'sara', name: 'Sara' },
  { id: 'unipol-service', name: 'Unipol Service' },
  { id: 'valpiave', name: 'ValPiave' },
  { id: 'verti', name: 'Verti' },
  { id: 'vittoria-assicurazioni', name: 'Vittoria Assicurazioni' },
  { id: 'zurich', name: 'Zurich' },
];

export const availableFeatures = [
  'Aria condizionata',
  'Autoradio',
  'Sensori di parcheggio',
  'Navigatore',
  'Sensore di stabilità',
  'Apple car play',
];
