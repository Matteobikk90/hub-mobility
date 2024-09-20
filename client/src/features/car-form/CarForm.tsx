import { useCarForm } from '@/features/car-form/hooks/useCarForm';
import { Car } from '@/types/car.types';
import React from 'react';

type CarFormProps = {
  initialCarData?: Partial<Car>;
  editCarId?: string | null;
  onSubmit: (carData: Partial<Car>, imageFile: File | null) => void;
  onCancelEdit: () => void; // Function to handle cancelling edit
};

// Available features to select from
const availableFeatures = ['Feature1', 'Feature2', 'Feature3', 'Feature4'];

export const CarForm: React.FC<CarFormProps> = ({
  initialCarData,
  editCarId,
  onSubmit,
  onCancelEdit,
}) => {
  const {
    carData,
    handleChange,
    handleNumberChange,
    handleFileChange,
    handleSubmit,
    setCarData,
    setImageFile,
    handleFeatureChange,
  } = useCarForm({
    initialData: initialCarData || {},
    onSubmit: (carData, imageFile) => {
      onSubmit(carData, imageFile); // Pass the form data to the parent
      setCarData({ title: '', subtitle: '', price: 0, features: [] }); // Reset form
      setImageFile(null);
    },
  });

  return (
    <div className="mb-8 border p-4 rounded">
      <h3 className="text-lg font-semibold mb-4">
        {editCarId ? 'Edit Car' : 'Add New Car'}
      </h3>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={carData.title || ''}
        onChange={handleChange}
        className="block mb-2 p-2 border rounded w-full"
      />
      <input
        type="text"
        name="subtitle"
        placeholder="Subtitle"
        value={carData.subtitle || ''}
        onChange={handleChange}
        className="block mb-2 p-2 border rounded w-full"
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={carData.price || 0}
        onChange={handleNumberChange}
        className="block mb-2 p-2 border rounded w-full"
      />

      {/* Features Checkboxes */}
      <div className="mb-4">
        <h4 className="mb-2">Features</h4>
        {availableFeatures.map((feature) => (
          <div key={feature}>
            <label>
              <input
                type="checkbox"
                checked={carData.features?.includes(feature) || false}
                onChange={() => handleFeatureChange(feature)}
              />
              {feature}
            </label>
          </div>
        ))}
      </div>

      <input
        type="file"
        onChange={handleFileChange}
        className="block mb-2 p-2"
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {editCarId ? 'Update Car' : 'Add Car'}
      </button>

      {editCarId && (
        <button
          onClick={onCancelEdit}
          className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
        >
          Cancel Edit
        </button>
      )}
    </div>
  );
};
