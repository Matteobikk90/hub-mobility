import { useContactForm } from '@/components/contact-form/hooks/useContactForm';
import { insuranceCompanies } from '@/utils/lists';
import { useEffect, useState } from 'react';

export const ContactForm = () => {
  const { formData, handleInputChange, handleSubmit } = useContactForm();
  const [filledFields, setFilledFields] = useState<Record<string, boolean>>({});

  // Update filledFields state if inputs are filled
  useEffect(() => {
    const updatedFields: Record<string, boolean> = {};
    Object.keys(formData).forEach((key) => {
      updatedFields[key] =
        formData[key as keyof typeof formData]?.toString().trim() !== '';
    });
    setFilledFields(updatedFields);
  }, [formData]);

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {/* Upload File */}
      <div className="col-span-1 md:col-span-2">
        <label className="block text-black text-sm mb-2">
          Allega qui i file
        </label>
        <input
          type="file"
          name="file"
          onChange={handleInputChange}
          className="w-full p-2 border-b border-black focus:outline-none"
        />
        <p className="text-xs text-black mt-1">Massimo larghezza file: 24 MB</p>
      </div>

      {/* Name */}
      <input
        type="text"
        name="nome"
        required
        placeholder="Nome"
        value={formData.nome}
        onChange={handleInputChange}
        className={`p-3 bg-transparent border-b focus:border-b-2 focus:border-azzurro ${
          filledFields.nome ? 'border-azzurro border-b-2' : 'border-black'
        }`}
      />

      {/* Surname */}
      <input
        type="text"
        name="cognome"
        required
        placeholder="Cognome"
        value={formData.cognome}
        onChange={handleInputChange}
        className={`p-3 bg-transparent border-b focus:border-b-2 focus:border-azzurro ${
          filledFields.cognome ? 'border-azzurro border-b-2' : 'border-black'
        }`}
      />

      {/* Email */}
      <input
        type="email"
        name="email"
        required
        placeholder="Email"
        value={formData.email}
        onChange={handleInputChange}
        className={`p-3 bg-transparent border-b focus:border-b-2 focus:border-azzurro ${
          filledFields.email ? 'border-azzurro border-b-2' : 'border-black'
        }`}
      />

      {/* Phone */}
      <input
        type="phone"
        name="telefono"
        required
        placeholder="Numero di telefono"
        value={formData.telefono}
        onChange={handleInputChange}
        className={`p-3 bg-transparent border-b focus:border-b-2 focus:border-azzurro ${
          filledFields.telefono ? 'border-azzurro border-b-2' : 'border-black'
        }`}
      />

      {/* Car License Plate */}
      <input
        type="text"
        name="targa"
        required
        placeholder="Targa auto"
        value={formData.targa}
        onChange={handleInputChange}
        className={`p-3 bg-transparent border-b focus:border-b-2 focus:border-azzurro ${
          filledFields.targa ? 'border-azzurro border-b-2' : 'border-black'
        }`}
      />

      {/* Car Model */}
      <input
        type="text"
        name="modello"
        required
        placeholder="Modello"
        value={formData.modello}
        onChange={handleInputChange}
        className={`p-3 bg-transparent border-b focus:border-b-2 focus:border-azzurro ${
          filledFields.modello ? 'border-azzurro border-b-2' : 'border-black'
        }`}
      />

      {/* Insurance Company */}
      <select
        name="compagnia"
        required
        value={formData.compagnia}
        onChange={handleInputChange}
        className={`p-3 bg-transparent border-b focus:border-b-2 focus:border-azzurro ${
          filledFields.compagnia ? 'border-azzurro border-b-2' : 'border-black'
        }`}
      >
        <option value="">La tua compagnia</option>
        {insuranceCompanies.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>

      {/* Address */}
      <input
        type="text"
        name="indirizzo"
        required
        placeholder="Indirizzo"
        value={formData.indirizzo}
        onChange={handleInputChange}
        className={`p-3 bg-transparent border-b focus:border-b-2 focus:border-azzurro ${
          filledFields.indirizzo ? 'border-azzurro border-b-2' : 'border-black'
        }`}
      />

      {/* Postal Code */}
      <input
        type="text"
        name="cap"
        required
        placeholder="CAP"
        value={formData.cap}
        onChange={handleInputChange}
        className={`p-3 bg-transparent border-b focus:border-b-2 focus:border-azzurro ${
          filledFields.cap ? 'border-azzurro border-b-2' : 'border-black'
        }`}
      />

      {/* Date Picker */}
      <input
        type="date"
        name="data"
        required
        value={formData.data}
        onChange={handleInputChange}
        className={`p-3 bg-transparent border-b focus:border-b-2 focus:border-azzurro ${
          filledFields.data ? 'border-azzurro border-b-2' : 'border-black'
        }`}
      />

      {/* Privacy Consent */}
      <div className="col-span-1 md:col-span-2">
        <label className="flex items-center text-black text-sm">
          <input
            type="checkbox"
            name="privacy"
            checked={formData.privacy}
            onChange={handleInputChange}
            className="mr-2"
          />
          Acconsento al trattamento dei miei dati personali (GDPR 679/2016). Ho
          letto{' '}
          <a href="/privacy-policy" className="text-azzurro">
            la privacy policy
          </a>
        </label>
      </div>

      {/* Submit Button */}
      <div className="col-span-1 md:col-span-2">
        <button
          type="submit"
          className="w-full bg-azzurro text-white py-3 rounded-md hover:bg-black transition"
        >
          Invia Richiesta
        </button>
      </div>
    </form>
  );
};
