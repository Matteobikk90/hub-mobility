import CarForm from '@/features/car-form';
import { auth, db, storage } from '@/firebase';
import { useAddCar } from '@/hooks/useAdd';
import { useDeleteCar } from '@/hooks/useDelete';
import { useEditCar } from '@/hooks/useEdit';
import { Car } from '@/types/car.types';
import { generateSlug } from '@/utils/formatting';
import { navbarLinks } from '@/utils/lists';
import { signOut } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Euro } from 'lucide-react';
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

  // Fetch cars for the selected section
  const fetchCars = async () => {
    const carsCollection = collection(db, sectionId);
    const carsSnapshot = await getDocs(carsCollection);
    const fetchedCars = carsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Car[];
    setCars(fetchedCars);
  };

  // Fetch cars when the sectionId changes
  useEffect(() => {
    fetchCars();
  }, [sectionId]);

  const handleSignOut = async () => {
    await signOut(auth);
    navigate('/login');
  };

  // Handle form submission (add or edit)
  const handleCarSubmit = async (
    carData: Partial<Car>,
    imageFile: File | null
  ) => {
    const slug = generateSlug(carData.title || '');

    if (editCarId) {
      const updatedCarData: Partial<Car> = {
        ...carData,
        slug,
        features: carData.features || [],
      };

      editCar(
        {
          carId: editCarId,
          updatedCarData,
          imageFile,
        },
        {
          onSuccess: () => {
            setCars((prevCars) =>
              prevCars.map((car) =>
                car.id === editCarId ? { ...car, ...updatedCarData } : car
              )
            );
            setEditCarId(null);
          },
        }
      );
    } else {
      // Add new car
      if (imageFile) {
        // Step 1: Upload image to Firebase Storage
        const imageRef = ref(storage, `cars/${slug}-${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);

        // Step 2: Get the download URL of the uploaded image
        const imageUrl = await getDownloadURL(imageRef);

        const newCarData: Partial<Car> = {
          ...carData,
          slug,
          imageUrl, // Add the image URL to the car data
          features: carData.features || [],
        };

        addCar(
          {
            carData: newCarData,
            imageFile,
          },
          {
            onSuccess: (newCar) => {
              setCars((prevCars) => [
                {
                  id: newCar.id,
                  title: newCarData.title || '',
                  subtitle: newCarData.subtitle || '',
                  slug: newCarData.slug || '',
                  imageUrl: newCarData.imageUrl || '', // Make sure the imageUrl is set here
                  features: newCarData.features || [],
                  price: newCarData.price ?? '',
                  transmission: newCarData.transmission || 'manual',
                },
                ...prevCars,
              ]);
            },
          }
        );
      } else {
        // If no image is provided, handle as usual without uploading an image
        const newCarData: Partial<Car> = {
          ...carData,
          slug,
          features: carData.features || [],
        };

        addCar(
          {
            carData: newCarData,
            imageFile,
          },
          {
            onSuccess: (newCar) => {
              setCars((prevCars) => [
                {
                  id: newCar.id,
                  title: newCarData.title || '',
                  subtitle: newCarData.subtitle || '',
                  slug: newCarData.slug || '',
                  imageUrl: '', // No image
                  features: newCarData.features || [],
                  price: newCarData.price ?? '',
                  transmission: newCarData.transmission || 'manual',
                },
                ...prevCars,
              ]);
            },
          }
        );
      }
    }
  };

  // Handle car deletion and reset form
  const handleDeleteCar = (carId: string, name: string) => {
    const confirmDelete = window.confirm(
      `Sei sicuro di voler rimuovere questa macchina - ${name.toUpperCase()} ?`
    );
    if (confirmDelete) {
      deleteCar(carId, {
        onSuccess: () => {
          setCars((prevCars) => prevCars.filter((car) => car.id !== carId));
          clearForm();
        },
      });
    }
  };

  const clearForm = () => setEditCarId(null);

  const handleEditCarSelection = (car: Car) => setEditCarId(car.id);

  return (
    <section className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-4">
        Panello di controllo - {sectionId}
      </h2>
      <div className="flex justify-between items-center mb-4">
        <select
          value={sectionId}
          onChange={(e) => setSectionId(e.target.value)}
          className="p-2 border rounded"
        >
          {navbarLinks.slice(0, 3).map(({ id, path, name }) => (
            <option key={id} value={path}>
              {name}
            </option>
          ))}
        </select>
        <button
          className="border border-black rounded p-2 hover:bg-black hover:text-white"
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
          <li
            key={car.id}
            className="flex flex-col gap-3 border p-4 rounded justify-between"
          >
            <h4 className="text-lg font-bold">{car.title}</h4>
            <p className="flex justify-between items-center">
              <span>{car.subtitle}</span>
              <span className="flex">
                <Euro /> {car.price}
              </span>
            </p>
            <p className="text-sm">{car.features.join(', ')}</p>
            <img className="w-full" alt={car.title} src={car.imageUrl} />
            <div className="grid grid-cols-2 items-center gap-4">
              <button
                onClick={() => handleEditCarSelection(car)}
                className="bg-yellow-500 text-white px-6 py-2 rounded"
              >
                Modifica
              </button>
              <button
                onClick={() => handleDeleteCar(car.id, car.title)}
                className="bg-red-500 text-white px-6 py-2 rounded"
              >
                Cancella
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
