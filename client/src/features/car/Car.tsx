import { fetchCarBySlug } from '@/utils/fetches';
import { selectOptions } from '@/utils/lists';
import { useQuery } from '@tanstack/react-query';
import { Euro, Info } from 'lucide-react';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const Car: React.FC = () => {
  const { sectionId, carSlug } = useParams<{
    sectionId: string;
    carSlug: string;
  }>();
  const navigate = useNavigate();

  const {
    data: car,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['car', carSlug],
    queryFn: () => fetchCarBySlug(sectionId!, carSlug!),
  });

  if (isLoading) return <div>Loading car details...</div>;
  if (error)
    return (
      <div>
        Error: {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );
  if (!car) return <div>Car not found</div>;

  // Get the appropriate select options based on the sectionId
  const currentOptions = selectOptions[sectionId as keyof typeof selectOptions];

  return (
    <section className="container mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center">
        {/* Left side: Car image */}
        <div className="relative">
          <img
            src={car.imageUrl}
            alt={car.title}
            className="w-full h-auto object-cover"
          />
          {/* Optional logo or overlay (like in the screenshot) */}
          <div className="absolute top-4 left-4">
            {/* Add any logo or additional elements */}
          </div>
        </div>

        {/* Right side: Form and pricing info */}
        <div className="bg-white p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{car.title}</h2>
          <p className="text-gray-600 mb-6">{car.subtitle}</p>

          <form className="grid grid-cols-1 gap-4">
            {/* Dropdown for Kilometres */}
            <div className="mb-4">
              <label className="block text-black text-sm mb-2">
                Scegli i km annui inclusi nel contratto
              </label>
              <select className="w-full p-3 bg-transparent border-b border-black focus:border-azzurro">
                {currentOptions.kilometres.map(({ id, label }) => (
                  <option key={id} value={id}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            {/* Dropdown for Duration */}
            <div className="mb-4">
              <label className="block text-black text-sm mb-2">
                Scegli la durata del contratto
              </label>
              <select className="w-full p-3 bg-transparent border-b border-black focus:border-azzurro">
                {currentOptions.duration.map(({ id, label }) => (
                  <option key={id} value={id}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            {/* Dropdown for Anticipo */}
            <div className="mb-4">
              <label className="block text-black text-sm mb-2">Anticipo</label>
              <select className="w-full p-3 bg-transparent border-b border-black focus:border-azzurro">
                {currentOptions.anticipo.map(({ id, label }) => (
                  <option key={id} value={id}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            {/* Pricing info */}
            <div className="text-4xl font-bold text-gray-900 flex items-center gap-2">
              <Euro size={45} />
              {car.price} <span className="text-sm">i.i.</span>
            </div>
            <p className="text-gray-500 text-sm mb-6 flex items-center gap-2">
              con servizi inclusi{' '}
              <a href="#" className="text-azzurro">
                <Info color="#F8B133" />
              </a>
            </p>

            {/* Submit Button */}
            <button className="w-full bg-azzurro text-white py-3 rounded-md hover:bg-black transition">
              Richiedi l'offerta
            </button>

            {/* Back Button */}
            <button
              type="button"
              className="w-full border border-gray-400 text-gray-600 py-3 rounded-md  hover:bg-gray-100 transition"
              onClick={() => navigate(`/automobili/${sectionId}`)}
            >
              Torna alle Offerte
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Car;
