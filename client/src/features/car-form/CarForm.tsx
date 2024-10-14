import { useCarForm } from '@/features/car-form/hooks/useCarForm';
import { Car } from '@/types/car.types';
import { availableFeatures, selectOptions } from '@/utils/lists';
import React, { useEffect, useRef } from 'react';

type CarFormProps = {
  initialCarData?: Partial<Car>;
  editCarId?: string | null;
  onSubmit: (carData: Partial<Car>, imageFile: File | null) => void;
  onCancelEdit: () => void;
  sectionId: string; // Pass sectionId to know which section we're in
};

export const CarForm: React.FC<CarFormProps> = ({
  initialCarData,
  editCarId,
  onSubmit,
  onCancelEdit,
  sectionId,
}) => {
  const {
    carData,
    handleChange,
    handleFileChange,
    handleSubmit,
    setCarData,
    setImageFile,
    handleFeatureChange,
  } = useCarForm({
    initialData: initialCarData || {},
    onSubmit: (carData, imageFile) => {
      onSubmit(carData, imageFile);

      setCarData({
        title: '',
        subtitle: '',
        prices: [],
        features: [],
        transmission: 'Manuale',
      });
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

  // Generate all combinations of kilometres, duration, and anticipo for "noleggio-lungo-termine"
  const generatePriceCombinations = () => {
    const kilometriOptions = selectOptions['noleggio-lungo-termine'].kilometres;
    const durationOptions = selectOptions['noleggio-lungo-termine'].duration;
    const anticipoOptions = selectOptions['noleggio-lungo-termine'].anticipo;

    const combinations = [];
    for (const kilometri of kilometriOptions) {
      for (const duration of durationOptions) {
        for (const anticipo of anticipoOptions) {
          combinations.push({ kilometri, duration, anticipo });
        }
      }
    }
    return combinations;
  };

  // Handle multiple price changes
  const handlePriceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedPrices = [...(carData.prices || [])];
    updatedPrices[index] = e.target.value;
    setCarData({ ...carData, prices: updatedPrices });
  };

  return (
    <div
      ref={formRef}
      className="border p-4 rounded grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <h3 className="text-lg font-semibold col-span-1 md:col-span-2">
        {editCarId ? 'Modifica' : 'Aggiungi nuova macchina'}
      </h3>

      {/* Title */}
      <input
        type="text"
        name="title"
        placeholder="Titolo"
        value={carData.title || ''}
        onChange={handleChange}
        className="p-3 bg-transparent border-b border-black focus:border-b-2 focus:border-blue-500 w-full"
      />

      {/* Subtitle */}
      <input
        type="text"
        name="subtitle"
        placeholder="Sottotitolo"
        value={carData.subtitle || ''}
        onChange={handleChange}
        className="p-3 bg-transparent border-b border-black focus:border-b-2 focus:border-blue-500 w-full"
      />

      {/* Prices */}
      {sectionId === 'super-car' || sectionId === 'noleggio-breve-termine' ? (
        <>
          <input
            type="number"
            name="price1"
            placeholder="Prezzo 1"
            value={carData.prices?.[0] || ''}
            onChange={(e) => handlePriceChange(e, 0)}
            className="p-3 bg-transparent border-b border-black focus:border-b-2 focus:border-blue-500 w-full"
          />
          <input
            type="number"
            name="price2"
            placeholder="Prezzo 2"
            value={carData.prices?.[1] || ''}
            onChange={(e) => handlePriceChange(e, 1)}
            className="p-3 bg-transparent border-b border-black focus:border-b-2 focus:border-blue-500 w-full"
          />
          <input
            type="number"
            name="price3"
            placeholder="Prezzo 3"
            value={carData.prices?.[2] || ''}
            onChange={(e) => handlePriceChange(e, 2)}
            className="p-3 bg-transparent border-b border-black focus:border-b-2 focus:border-blue-500 w-full"
          />
        </>
      ) : (
        <>
          {generatePriceCombinations().map((combination, index) => (
            <div key={index} className="col-span-1 md:col-span-2">
              <label className="block text-xs">
                Prezzo per {combination.kilometri.label},{' '}
                {combination.duration.label}, {combination.anticipo.label}
              </label>
              <input
                type="number"
                name={`price-${index}`}
                placeholder={`Prezzo per ${combination.kilometri.label}, ${combination.duration.label}, ${combination.anticipo.label}`}
                value={carData.prices?.[index] || ''}
                onChange={(e) => handlePriceChange(e, index)}
                className="p-1 bg-transparent border-b border-black focus:border-b-2 focus:border-blue-500 w-full"
              />
            </div>
          ))}
        </>
      )}

      {/* Features Checkboxes */}
      <div className="col-span-1 md:col-span-2">
        <h4 className="mb-2">Accessori</h4>
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

      {/* Transmission Radio Input */}
      <div className="col-span-1 md:col-span-2">
        <h4 className="mb-2">Tipo di Trasmissione</h4>
        <div className="flex items-center gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="transmission"
              value="Automatico"
              checked={carData.transmission === 'Automatico'}
              onChange={handleChange}
              className="mr-2"
            />
            Automatico
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="transmission"
              value="Manuale"
              checked={carData.transmission === 'Manuale'}
              onChange={handleChange}
              className="mr-2"
            />
            Manuale
          </label>
        </div>
      </div>

      {/* Image Upload */}
      <div className="col-span-1 md:col-span-2">
        <label className="block text-black text-sm mb-2">Carica immagine</label>
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
          {editCarId ? 'Aggiorna' : 'Aggiungi'}
        </button>
      </div>

      {/* Cancel Button (only in edit mode) */}
      {editCarId && (
        <div className="col-span-1 md:col-span-2">
          <button
            onClick={onCancelEdit}
            className="w-full bg-gray-500 text-white py-3 rounded-md hover:bg-gray-700 transition"
          >
            Indietro
          </button>
        </div>
      )}
    </div>
  );
};
