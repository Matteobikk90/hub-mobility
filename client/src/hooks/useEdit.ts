import { db, storage } from '@/firebase';
import { useToast } from '@/hooks/useToast';
import { Car } from '@/types/car.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

// Function to handle car edit
const handleEditCar = async (
  carId: string,
  updatedCarData: Partial<Car>,
  sectionId: string,
  imageFile: File | null
) => {
  const carDocRef = doc(db, `section_${sectionId}`, carId);

  if (imageFile) {
    const imageRef = ref(storage, `cars/${imageFile.name}`);
    const uploadTask = uploadBytesResumable(imageRef, imageFile);

    // Upload image and update with image URL
    return new Promise<void>((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        null,
        (error) => reject(error),
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          updatedCarData = { ...updatedCarData, imageUrl: downloadURL };

          // Update Firestore document
          await updateDoc(carDocRef, updatedCarData);
          resolve();
        }
      );
    });
  } else {
    // If no image is provided, just update the Firestore document
    await updateDoc(carDocRef, updatedCarData);
  }
};

// UseMutation hook for editing a car
export const useEditCar = (sectionId: string) => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useToast(); // Access the toast functions

  return useMutation({
    mutationFn: ({
      carId,
      updatedCarData,
      imageFile,
    }: {
      carId: string;
      updatedCarData: Partial<Car>;
      imageFile: File | null;
    }) => handleEditCar(carId, updatedCarData, sectionId, imageFile),
    retry: 0,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cars', sectionId],
        refetchType: 'all',
        type: 'active',
      });
      showSuccess('Car updated successfully!'); // Show success toast
    },
    onError: (error, { carId }) => {
      showError(`Failed to update car with ID: ${carId}.`);
      console.error(`Error editing the car with ID: ${carId}`, error);
    },
  });
};
