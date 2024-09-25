import CarForm from '@/features/car-form';
import { auth, db } from '@/firebase';
import { useAddCar } from '@/hooks/useAdd';
import { useDeleteCar } from '@/hooks/useDelete';
import { useEditCar } from '@/hooks/useEdit';
import { Car } from '@/types/car.types';
import { navbarLinks } from '@/utils/lists';
import { generateSlug } from '@/utils/utilities';
import { signOut } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [sectionId, setSectionId] = useState('noleggio-lungo-termine');
  const [cars, setCars] = useState<Car[]>([]);
  const [editCarId, setEditCarId] = useState<string | null>(null);

  const { mutate: deleteCar } = useDeleteCar(sectionId);
  const { mutate: editCar } = useEditCar(sectionId);
  const { mutate: addCar } = useAddCar(sectionId);

  // Fetch cars for the selected section when it changes
  useEffect(() => {
    const fetchCars = async () => {
      const carsCollection = collection(db, sectionId);
      const carsSnapshot = await getDocs(carsCollection);
      const fetchedCars = carsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Car[];
      setCars(fetchedCars);
    };

    fetchCars();
  }, [sectionId]);

  const handleSignOut = async () => {
    await signOut(auth);
    navigate('/login');
  };

  // Handle form submission (add or edit)
  const handleCarSubmit = (carData: Partial<Car>, imageFile: File | null) => {
    const slug = generateSlug(carData.title || '');

    if (editCarId) {
      const updatedCarData: Partial<Car> = {
        ...carData,
        slug,
        features: carData.features || [],
      };
      editCar({
        carId: editCarId,
        updatedCarData,
        imageFile,
      });
      setEditCarId(null);
    } else {
      const newCarData: Partial<Car> = {
        ...carData,
        slug,
        features: carData.features || [],
      };
      addCar({
        carData: newCarData,
        imageFile,
      });
    }
  };

  // Clear form and exit edit mode
  const clearForm = () => setEditCarId(null);

  // Select a car to edit
  const handleEditCarSelection = (car: Car) => setEditCarId(car.id);

  // Handle car deletion and reset form
  const handleDeleteCar = (carId: string, name: string) => {
    const confirmDelete = window.confirm(
      `Sei sicuro di voler rimuovere questa macchina - ${name.toUpperCase()} ?`
    );
    if (confirmDelete) {
      deleteCar(carId, {
        onSuccess: () => clearForm(),
      });
    }
  };

  return (
    <section className="container mx-auto py-8">
      <h2 className="text-3xl font-semibold mb-4">
        Panello di controllo - {sectionId}
      </h2>
      <div className="flex justify-between items-center">
        <select
          value={sectionId}
          onChange={(e) => setSectionId(e.target.value)}
          className="mb-4 p-2 border rounded"
        >
          {navbarLinks.slice(0, 3).map(({ id, path, name }) => (
            <option key={id} value={path}>
              {name}
            </option>
          ))}
        </select>
        <button
          className="border border-black rounded-full p-2 hover:bg-black hover:text-white"
          onClick={handleSignOut}
        >
          Logout
        </button>
      </div>

      {/* Display existing cars in the section */}
      <ul className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        <CarForm
          initialCarData={
            editCarId ? cars.find((car) => car.id === editCarId) : {}
          }
          editCarId={editCarId}
          onSubmit={handleCarSubmit}
          onCancelEdit={clearForm}
        />
        {cars.map((car) => (
          <li key={car.id} className="mb-4">
            <h4 className="text-lg font-bold">{car.title}</h4>
            <p>{car.subtitle}</p>
            <p>Price: ${car.price}</p>
            <p>Features: {car.features.join(', ')}</p>
            <img width={200} alt={car.title} src={car.imageUrl} />
            <button
              onClick={() => handleEditCarSelection(car)}
              className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteCar(car.id, car.title)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};
