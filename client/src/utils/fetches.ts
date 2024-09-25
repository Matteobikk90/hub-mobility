import { db } from '@/firebase';
import { Car } from '@/types/car.types';
import { collection, getDocs, query, where } from 'firebase/firestore';

export const fetchCars = async (sectionId: string): Promise<Car[]> => {
  const querySnapshot = await getDocs(collection(db, sectionId));
  const cars = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    title: doc.data().title,
    slug: doc.data().slug,
    subtitle: doc.data().subtitle,
    imageUrl: doc.data().imageUrl,
    features: doc.data().features,
    price: doc.data().price,
  })) as Car[];
  return cars;
};

export const fetchCarBySlug = async (sectionId: string, slug: string) => {
  const carQuery = query(collection(db, sectionId), where('slug', '==', slug));
  const querySnapshot = await getDocs(carQuery);
  if (!querySnapshot.empty) {
    return querySnapshot.docs[0].data();
  } else {
    throw new Error('Car not found');
  }
};
