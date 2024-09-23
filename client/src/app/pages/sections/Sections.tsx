import { db } from '@/firebase';
import { Car } from '@/types/car.types';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useParams } from 'react-router-dom';

const fetchCars = async (sectionId: string): Promise<Car[]> => {
  const querySnapshot = await getDocs(collection(db, sectionId));
  const cars = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    title: doc.data().title,
    subtitle: doc.data().subtitle,
    imageUrl: doc.data().imageUrl,
    features: doc.data().features,
  })) as Car[];
  return cars;
};

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
  console.log(sectionId);
  console.log(cars);

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
    <section className="container mx-auto">
      <h2 className="text-2xl font-semibold mb-4">
        Cars in Section {sectionId}
      </h2>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {displayedCars?.map((car) => (
          <div key={car.id} className="border p-4">
            <img
              src={car.imageUrl}
              alt={car.title}
              className="w-full h-48 object-cover"
            />
            <h3 className="text-lg font-bold">{car.title}</h3>
            <p>{car.subtitle}</p>
            <p>{car.features.join(', ')}</p>
            <p className="text-green-600">${car.price}</p>
          </div>
        ))}
      </div>

      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        pageCount={Math.ceil(cars!.length / carsPerPage)}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'prev-item'}
        previousLinkClassName={'prev-link'}
        nextClassName={'next-item'}
        nextLinkClassName={'next-link'}
        disabledClassName={'disabled'}
      />
    </section>
  );
};
