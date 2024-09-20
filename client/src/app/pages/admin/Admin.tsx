import { db, storage } from '@/firebase';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useEffect, useState } from 'react';

type Car = {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  features: string[];
  price: number;
};

type UpdatedCarData = {
  title?: string;
  subtitle?: string;
  price?: number;
  features?: string[];
  imageUrl?: string;
};

export const Admin: React.FC = () => {
  const [sectionId, setSectionId] = useState('1'); // Default to Section 1
  const [cars, setCars] = useState<Car[]>([]);
  const [newCar, setNewCar] = useState<Partial<Car>>({
    title: '',
    subtitle: '',
    price: 0,
    features: [],
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editCarId, setEditCarId] = useState<string | null>(null);

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

  // Add a new car to Firestore with image upload and features
  const handleAddCar = async () => {
    if (
      !newCar.title ||
      !newCar.subtitle ||
      !imageFile ||
      newCar.price === undefined
    )
      return;

    const imageRef = ref(storage, `cars/${imageFile.name}`);
    const uploadTask = uploadBytesResumable(imageRef, imageFile);

    uploadTask.on(
      'state_changed',
      null,
      (error) => console.error(error),
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        const carData = {
          ...newCar,
          imageUrl: downloadURL,
          features: newCar.features || [],
        } as Car;

        await addDoc(collection(db, `section_${sectionId}`), carData);

        setCars((prevCars) => [...prevCars, carData]);
        setNewCar({ title: '', subtitle: '', price: 0, features: [] });
        setImageFile(null);
      }
    );
  };

  // Delete an item from Firestore
  const handleDeleteCar = async (id: string) => {
    await deleteDoc(doc(db, `section_${sectionId}`, id));
    setCars(cars.filter((car) => car.id !== id)); // Remove the car from the list
  };

  // Select a car to edit
  const handleEditCar = (car: Car) => {
    setEditCarId(car.id);
    setNewCar(car);
  };

  // Update an existing car in Firestore
  const handleUpdateCar = async () => {
    if (editCarId) {
      const carDocRef = doc(db, `section_${sectionId}`, editCarId);

      // Prepare the updated car data
      let updatedCarData: UpdatedCarData = {
        ...(newCar.title && { title: newCar.title }),
        ...(newCar.subtitle && { subtitle: newCar.subtitle }),
        ...(newCar.price !== undefined && { price: newCar.price }),
        ...(newCar.features && { features: newCar.features }),
      };

      // If a new image is provided, handle image upload
      if (imageFile) {
        const imageRef = ref(storage, `cars/${imageFile.name}`);
        const uploadTask = uploadBytesResumable(imageRef, imageFile);

        uploadTask.on(
          'state_changed',
          null,
          (error) => console.error(error),
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

            // Add the imageUrl to the car data
            updatedCarData = { ...updatedCarData, imageUrl: downloadURL };

            // Update the car in Firestore with new image
            await updateDoc(carDocRef, updatedCarData);
            setCars(
              cars.map((car) =>
                car.id === editCarId ? { ...car, ...updatedCarData } : car
              )
            );
            setEditCarId(null); // Exit edit mode
            setNewCar({ title: '', subtitle: '', price: 0, features: [] });
            setImageFile(null);
          }
        );
      } else {
        // Update Firestore without image change
        await updateDoc(carDocRef, updatedCarData);
        setCars(
          cars.map((car) =>
            car.id === editCarId ? { ...car, ...updatedCarData } : car
          )
        );
        setEditCarId(null); // Exit edit mode
        setNewCar({ title: '', subtitle: '', price: 0, features: [] });
      }
    }
  };

  return (
    <div className="admin-panel container mx-auto py-8">
      <h2 className="text-2xl font-semibold mb-4">
        Admin Panel - Section {sectionId}
      </h2>

      {/* Section Select */}
      <select
        value={sectionId}
        onChange={(e) => setSectionId(e.target.value)}
        className="mb-4 p-2 border rounded"
      >
        {[...Array(5)].map((_, index) => (
          <option key={index} value={`${index + 1}`}>
            Section {index + 1}
          </option>
        ))}
      </select>

      {/* Add/Edit Car Form */}
      <div className="mb-8 border p-4 rounded">
        <h3 className="text-lg font-semibold mb-4">
          {editCarId ? 'Edit Car' : 'Add New Car'}
        </h3>
        <input
          type="text"
          placeholder="Title"
          value={newCar.title || ''}
          onChange={(e) =>
            setNewCar((prev) => ({ ...prev, title: e.target.value }))
          }
          className="block mb-2 p-2 border rounded w-full"
        />
        <input
          type="text"
          placeholder="Subtitle"
          value={newCar.subtitle || ''}
          onChange={(e) =>
            setNewCar((prev) => ({ ...prev, subtitle: e.target.value }))
          }
          className="block mb-2 p-2 border rounded w-full"
        />
        <input
          type="number"
          placeholder="Price"
          value={newCar.price || 0}
          onChange={(e) =>
            setNewCar((prev) => ({
              ...prev,
              price: parseFloat(e.target.value),
            }))
          }
          className="block mb-2 p-2 border rounded w-full"
        />
        <input
          type="file"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          className="block mb-2 p-2"
        />

        <button
          onClick={editCarId ? handleUpdateCar : handleAddCar}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editCarId ? 'Update Car' : 'Add Car'}
        </button>
      </div>

      {/* Display existing cars in the section */}
      <div className="cars-list">
        <h3 className="text-lg font-semibold mb-4">
          Cars in Section {sectionId}
        </h3>
        <ul>
          {cars.map((car) => (
            <li key={car.id} className="mb-4">
              <h4 className="text-lg font-bold">{car.title}</h4>
              <p>{car.subtitle}</p>
              <p>Price: ${car.price}</p>
              <p>Features: {car.features.join(', ')}</p>
              <img alt={car.title} src={car.imageUrl} />
              <button
                onClick={() => handleEditCar(car)}
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
    </div>
  );
};
