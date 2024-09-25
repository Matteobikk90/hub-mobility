import { useCarForm } from '@/features/car-form/hooks/useCarForm';
import { Car } from '@/types/car.types';
import { availableFeatures } from '@/utils/lists';
import { generateSlug } from '@/utils/utilities';
import React, { useEffect, useRef } from 'react';

type CarFormProps = {
  initialCarData?: Partial<Car>;
  editCarId?: string | null;
  onSubmit: (carData: Partial<Car>, imageFile: File | null) => void;
  onCancelEdit: () => void; // Function to handle cancelling edit
};

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
      const slug = generateSlug(carData.title || ''); // Generate the slug from the title
      onSubmit({ ...carData, slug }, imageFile); // Include slug in the car data passed to parent

      setCarData({ title: '', subtitle: '', price: 0, features: [] }); // Reset form
      setImageFile(null);
    },
  });

  // Scroll to the form when editing
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editCarId && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [editCarId]);

  return (
    <div
      ref={formRef}
      className="mb-8 border p-4 rounded grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <h3 className="text-lg font-semibold col-span-1 md:col-span-2">
        {editCarId ? 'Edit Car' : 'Add New Car'}
      </h3>

      {/* Title */}
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={carData.title || ''}
        onChange={handleChange}
        className="p-3 bg-transparent border-b border-black focus:border-b-2 focus:border-blue-500 w-full"
      />

      {/* Subtitle */}
      <input
        type="text"
        name="subtitle"
        placeholder="Subtitle"
        value={carData.subtitle || ''}
        onChange={handleChange}
        className="p-3 bg-transparent border-b border-black focus:border-b-2 focus:border-blue-500 w-full"
      />

      {/* Price */}
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={carData.price || 0}
        onChange={handleNumberChange}
        className="p-3 bg-transparent border-b border-black focus:border-b-2 focus:border-blue-500 w-full"
      />

      {/* Features Checkboxes */}
      <div className="col-span-1 md:col-span-2">
        <h4 className="mb-2">Features</h4>
        <div className="grid grid-cols-2 gap-2">
          {availableFeatures.map((feature) => (
            <label key={feature} className="flex items-center">
              <input
                type="checkbox"
                checked={carData.features?.includes(feature) || false}
                onChange={() => handleFeatureChange(feature)}
                className="mr-2"
              />
              {feature}
            </label>
          ))}
        </div>
      </div>

      {/* Image Upload */}
      <div className="col-span-1 md:col-span-2">
        <label className="block text-black text-sm mb-2">Upload Image</label>
        <input
          type="file"
          onChange={handleFileChange}
          className="p-3 bg-transparent border-b border-black focus:border-b-2 focus:border-blue-500 w-full"
        />
      </div>

      {/* Submit Button */}
      <div className="col-span-1 md:col-span-2">
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-700 transition"
        >
          {editCarId ? 'Update Car' : 'Add Car'}
        </button>
      </div>

      {/* Cancel Button (only in edit mode) */}
      {editCarId && (
        <div className="col-span-1 md:col-span-2">
          <button
            onClick={onCancelEdit}
            className="w-full bg-gray-500 text-white py-3 rounded-md hover:bg-gray-700 transition"
          >
            Cancel Edit
          </button>
        </div>
      )}
    </div>
  );
};
