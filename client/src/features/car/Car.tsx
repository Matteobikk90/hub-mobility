import { fetchCarBySlug } from '@/utils/fetches';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';

export const Car: React.FC = () => {
  const { sectionId, carSlug } = useParams<{
    sectionId: string;
    carSlug: string;
  }>();

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

  return (
    <section>
      <div className="bg-black font-bold text-white flex flex-col gap-4 text-center p-8">
        <h2 className="text-4xl">{car.title}</h2>
        <h3 className="text-xl">{car.subtitle}</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 m-[6rem_auto] max-w-[60rem]">
        <img
          src={car.imageUrl}
          alt={car.title}
          className="w-full h-96 object-cover rounded-md"
        />
        <div>
          <p className="text-gray-400 mb-2">{car.subtitle}</p>

          <ul className="text-white text-sm mb-4">
            {car.features.map((feature: string, index: number) => (
              <li key={index} className="mb-2">
                {feature}
              </li>
            ))}
          </ul>

          <p className="text-green-600 text-xl font-semibold">€{car.price}</p>
        </div>
      </div>
    </section>
  );
};

export default Car;
