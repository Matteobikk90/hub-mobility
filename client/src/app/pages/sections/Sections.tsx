import { fetchCars } from '@/utils/fetches';
import { useQuery } from '@tanstack/react-query';
import { Euro } from 'lucide-react';
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link, useParams } from 'react-router-dom';

export const Section: React.FC = () => {
  const { sectionId } = useParams<{ sectionId: string }>();
  const [currentPage, setCurrentPage] = useState(0);
  const carsPerPage = 6;

  const {
    data: cars,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['cars', sectionId],
    queryFn: () => fetchCars(sectionId!),
  });

  const displayedCars = cars?.slice(
    currentPage * carsPerPage,
    (currentPage + 1) * carsPerPage
  );

  const handlePageClick = (selectedItem: { selected: number }) =>
    setCurrentPage(selectedItem.selected);

  if (isLoading) return <div>Loading cars...</div>;

  if (error)
    return (
      <div>
        Error loading cars:{' '}
        {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );

  return (
    <section className="max-w-[78rem] mx-auto p-8">
      <h2 className="text-4xl font-bold text-black mb-8 text-center">
        {sectionId}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 justify-between gap-8">
        {displayedCars?.map((car) => (
          <article className="text-black flex flex-col gap-4">
            <img
              src={car.imageUrl}
              alt={car.title}
              className="h-auto object-cover"
            />
            {console.log(car) as any}
            <h3 className="text-2xl font-bold">{car.title}</h3>
            <p className="font-medium">{car.subtitle}</p>
            <span className="w-full h-[0.125rem] bg-azzurro"></span>
            <ul className="flex flex-wrap gap-6 text-xs">
              {car.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-1">
                  <span className="text-azzurro">✔</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="ml-auto text-right">
              <div className="border-b-2 pb-1 mb-1 border-b-azzurro max-w-max flex gap-1 items-end">
                da
                <strong className="text-3xl font-medium">{car.price}</strong>
                <Euro size={45} />
              </div>
              al giorno
            </div>
            <Link
              to={`/automobili/${sectionId}/${car.slug}`}
              key={car.id}
              className="flex flex-col justify-between"
            >
              <button className="text-black hover:font-bold text-xl border-b-2 border-b-azzurro py-2">
                Richiedi preventivo
              </button>
            </Link>
          </article>
        ))}
      </div>

      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        pageCount={Math.ceil(cars!.length / carsPerPage)}
        onPageChange={handlePageClick}
        containerClassName={'pagination flex justify-center mt-8'}
        activeClassName={'active text-azzurro'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'prev-item'}
        previousLinkClassName={'prev-link text-azzurro'}
        nextClassName={'next-item'}
        nextLinkClassName={'next-link text-azzurro'}
        disabledClassName={'disabled text-gray-400'}
      />
    </section>
  );
};
