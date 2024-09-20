import { db, storage } from '@/firebase';
import { useToast } from '@/hooks/useToast';
import { Car } from '@/types/car.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

// Function to handle adding a new car
const handleAddCar = async (
  carData: Partial<Car>,
  sectionId: string,
  imageFile: File | null
) => {
  let carWithImageUrl = carData;

  if (imageFile) {
    const imageRef = ref(storage, `cars/${imageFile.name}`);
    const uploadTask = uploadBytesResumable(imageRef, imageFile);

    // Upload image and add image URL to car data
    await new Promise<void>((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        null,
        (error) => reject(error),
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          carWithImageUrl = { ...carData, imageUrl: downloadURL }; // Add image URL to car data
          resolve();
        }
      );
    });
  }

  // Add car to Firestore
  await addDoc(collection(db, `section_${sectionId}`), carWithImageUrl);
};

// UseMutation hook for adding a new car
export const useAddCar = (sectionId: string) => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useToast(); // Access the toast functions

  return useMutation({
    mutationFn: ({
      carData,
      imageFile,
    }: {
      carData: Partial<Car>;
      imageFile: File | null;
    }) => handleAddCar(carData, sectionId, imageFile),
    retry: 0,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cars', sectionId],
        refetchType: 'all',
        type: 'active',
      });
      showSuccess('Car added successfully!'); // Show success toast
    },
    onError: (error) => {
      showError('Failed to add car. Please try again.');
      console.error('Error adding the car:', error);
    },
  });
};
