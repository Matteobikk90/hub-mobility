import CarForm from '@/features/car-form';
import { auth, db } from '@/firebase';
import { useAddCar } from '@/hooks/useAdd';
import { useDeleteCar } from '@/hooks/useDelete';
import { useEditCar } from '@/hooks/useEdit';
import { Car } from '@/types/car.types';
import { navbarLinks } from '@/utils/lists';
import { signOut } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [sectionId, setSectionId] = useState('long'); // Default to Section 1
  const [cars, setCars] = useState<Car[]>([]);
  const [editCarId, setEditCarId] = useState<string | null>(null);

  const { mutate: deleteCar } = useDeleteCar(sectionId);
  const { mutate: editCar } = useEditCar(sectionId);
  const { mutate: addCar } = useAddCar(sectionId); // Use the add car mutation

  // Fetch cars for the selected section when it changes
  useEffect(() => {
    const fetchCars = async () => {
      const carsCollection = collection(db, `section_${sectionId}`);
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
    if (editCarId) {
      // Edit existing car
      const updatedCarData: Partial<Car> = {
        ...carData,
        features: carData.features || [],
      };
      editCar({
        carId: editCarId,
        updatedCarData,
        imageFile,
      });
      setEditCarId(null);
    } else {
      // Add new car
      addCar({
        carData,
        imageFile,
      });
    }
  };

  // Clear form and exit edit mode
  const clearForm = () => {
    setEditCarId(null);
  };

  // Select a car to edit
  const handleEditCarSelection = (car: Car) => {
    setEditCarId(car.id);
  };

  // Handle car deletion and reset form
  const handleDeleteCar = (carId: string) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this car?'
    );
    if (confirmDelete) {
      deleteCar(carId, {
        onSuccess: () => {
          clearForm(); // Clear form after deleting a car
        },
      });
    }
  };

  return (
    <section className="container mx-auto py-8">
      <h2 className="text-2xl font-semibold mb-4">Admin Panel - Macchine</h2>
      <div className="flex justify-between">
        <select
          value={sectionId}
          onChange={(e) => setSectionId(e.target.value)}
          className="mb-4 p-2 border rounded"
        >
          {navbarLinks.slice(0, 3).map(({ id, name }) => (
            <option key={id} value={name}>
              {name}
            </option>
          ))}
        </select>
        <button onClick={handleSignOut}>Logout</button>
      </div>

      {/* Car Form Component */}
      <CarForm
        initialCarData={
          editCarId ? cars.find((car) => car.id === editCarId) : undefined
        }
        editCarId={editCarId}
        onSubmit={handleCarSubmit}
        onCancelEdit={clearForm}
      />

      {/* Display existing cars in the section */}
      <div className="cars-list">
        <h3 className="text-lg font-semibold mb-4">Macchine in {sectionId}</h3>
        <ul>
          {cars.map((car) => (
            <li key={car.id} className="mb-4">
              <h4 className="text-lg font-bold">{car.title}</h4>
              <p>{car.subtitle}</p>
              <p>Price: ${car.price}</p>
              <p>Features: {car.features.join(', ')}</p>
              <img alt={car.title} src={car.imageUrl} />
              <button
                onClick={() => handleEditCarSelection(car)}
                className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteCar(car.id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
