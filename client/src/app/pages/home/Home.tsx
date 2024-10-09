import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ImageSlider } from '@/components/carousel';
import { services } from '@/utils/lists';

export const Home: React.FC = () => {
  return (
    <>
      <div>
        <ImageSlider />
        <div className="text-center px-4 py-12">
          <h1 className="text-3xl font-bold mb-4">
            INNOVAZIONE E ECCELLENZA NELL'AUTOMOTIVE
          </h1>
          <p className="text-sm">
            Benvenuti nel Gruppo Maestri, leader nel settore dell’automotive con
            una lunga tradizione di eccellenza e innovazione. Fondata con la
            passione per l’arte della carrozzeria e la precisione nella
            riparazione, la nostra azienda si distingue per l’impegno costante
            nella qualità e nella soddisfazione del cliente. Al Gruppo Maestri,
            uniamo la maestria artigianale con le tecnologie più avanzate per
            offrire soluzioni all’avanguardia e personalizzate. Scopri la nostra
            storia, i nostri valori e la nostra visione per il futuro
            dell’automotive.
          </p>
        </div>
      </div>
      <div className="text-center px-4 py-12 bg-azzurro">
        <h2 className="text-3xl font-bold mb-8">
          I vantaggi deI servizi offerti da hub Mobility
        </h2>
        <ul className="grid grid-cols-2 gap-4 max-w-[50rem] m-auto text-sm">
          {services.map(({ img, text }) => (
            <li>
              <img src={img} />
              {text}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Home;
