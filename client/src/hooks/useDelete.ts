import { db, storage } from '@/firebase'; // Import storage from your firebase.ts
import { useToast } from '@/hooks/useToast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage'; // Firebase Storage methods

// Function to delete a car from Firestore and its image from Firebase Storage
const handleDeleteCar = async (carId: string, sectionId: string) => {
  const carDocRef = doc(db, sectionId, carId);

  // Get the car data to retrieve the image URL
  const carDoc = await getDoc(carDocRef);
  const carData = carDoc.data();

  if (carData && carData.imageUrl) {
    // Create a reference to the file to delete
    const imageRef = ref(storage, carData.imageUrl);

    // Delete the image from storage
    await deleteObject(imageRef)
      .then(() => {
        console.log('Image deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting image:', error);
      });
  }

  // Delete the car document from Firestore
  await deleteDoc(carDocRef);
};

// UseMutation hook for deleting a car
export const useDeleteCar = (sectionId: string) => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useToast();

  return useMutation({
    mutationFn: (carId: string) => handleDeleteCar(carId, sectionId),
    retry: 0,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cars', sectionId],
        refetchType: 'all',
        type: 'active',
      });
      showSuccess('Macchina rimossa correttamente');
    },
    onError: (error, carId) => {
      showError(`Failed to delete car with ID: ${carId}.`);
      console.error(`Error deleting the car with ID: ${carId}`, error);
    },
  });
};
