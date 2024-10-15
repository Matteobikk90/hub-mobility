import { Car } from '@/types/car.types';
import { useCallback, useEffect, useState } from 'react';

type UseCarFormProps = {
  initialData?: Partial<Car>;
  onSubmit: (carData: Partial<Car>, imageFile: File | null) => void;
};

export const useCarForm = ({ initialData, onSubmit }: UseCarFormProps) => {
  const [carData, setCarData] = useState<Partial<Car>>(initialData || {});
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    setCarData(initialData || {});
  }, [initialData]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setCarData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleNumberChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setCarData((prev) => ({ ...prev, [name]: parseFloat(value) }));
    },
    []
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setImageFile(e.target.files?.[0] || null);
    },
    []
  );

  const handleSubmit = useCallback(() => {
    onSubmit(carData, imageFile);
  }, [carData, imageFile, onSubmit]);

  return {
    carData,
    imageFile,
    handleChange,
    handleNumberChange,
    handleFileChange,
    handleSubmit,
    setCarData,
    setImageFile,
  };
};
