import { Car } from '@/types/car.types';
import { useEffect, useState } from 'react';

type UseCarFormProps = {
  initialData?: Partial<Car>;
  onSubmit: (carData: Partial<Car>, imageFile: File | null) => void;
};

export const useCarForm = ({ initialData, onSubmit }: UseCarFormProps) => {
  const [carData, setCarData] = useState<Partial<Car>>(initialData || {});

  useEffect(() => {
    setCarData(initialData || {});
  }, [initialData]);

  const [imageFile, setImageFile] = useState<File | null>(null);

  // Handle input changes for text fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCarData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle number input change
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCarData((prev) => ({ ...prev, [name]: parseFloat(value) }));
  };

  // Handle feature checkbox toggling
  const handleFeatureChange = (feature: string) => {
    setCarData((prev) => {
      const features = prev.features || [];
      const updatedFeatures = features.includes(feature)
        ? features.filter((f) => f !== feature) // Remove the feature
        : [...features, feature]; // Add the feature
      return { ...prev, features: updatedFeatures };
    });
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageFile(e.target.files?.[0] || null);
  };

  // Handle form submission
  const handleSubmit = () => {
    onSubmit(carData, imageFile);
  };

  return {
    carData,
    imageFile,
    handleChange,
    handleNumberChange,
    handleFileChange,
    handleFeatureChange,
    handleSubmit,
    setCarData,
    setImageFile,
  };
};
