import { db } from '@/firebase';
import { useToast } from '@/hooks/useToast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteDoc, doc } from 'firebase/firestore';

// Function to delete a car
const handleDeleteCar = async (carId: string, sectionId: string) => {
  const carDocRef = doc(db, `section_${sectionId}`, carId);
  await deleteDoc(carDocRef); // Firebase delete operation
};

// UseMutation hook for deleting a car
export const useDeleteCar = (sectionId: string) => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useToast(); // Access the toast functions

  return useMutation({
    mutationFn: (carId: string) => handleDeleteCar(carId, sectionId),
    retry: 0,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cars', sectionId],
        refetchType: 'all',
        type: 'active',
      });
      showSuccess('Car deleted successfully!'); // Show success toast
    },
    onError: (error, carId) => {
      showError(`Failed to delete car with ID: ${carId}.`);
      console.error(`Error deleting the car with ID: ${carId}`, error);
    },
  });
};
