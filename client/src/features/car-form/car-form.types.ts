import { Car } from '@/types/car.types';

export type CarFormProps = {
  initialCarData?: Partial<Car>;
  editCarId?: string | null;
  onSubmit: (carData: Partial<Car>, imageFile: File | null) => void;
  onCancelEdit: () => void; // Function to handle cancelling edit
};
