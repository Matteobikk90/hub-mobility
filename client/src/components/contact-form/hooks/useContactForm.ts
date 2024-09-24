import { useCallback, useState } from 'react';

export const useContactForm = () => {
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    email: '',
    telefono: '',
    targa: '',
    modello: '',
    compagnia: '',
    indirizzo: '',
    cap: '',
    data: '',
    file: null as File | null,
    privacy: false, // Privacy is false by default
  });

  // Handle form input changes with type guards
  const handleInputChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value, type } = e.target;

      // Handle file input separately
      if (type === 'file' && e.target instanceof HTMLInputElement) {
        const files = e.target.files;
        if (files && files.length > 0) {
          setFormData({
            ...formData,
            [name]: files[0], // Handle single file
          });
        }
      }
      // Handle checkbox inputs
      else if (type === 'checkbox' && e.target instanceof HTMLInputElement) {
        setFormData({
          ...formData,
          [name]: e.target.checked, // Handle checkbox state
        });
      }
      // Handle all other input types
      else {
        setFormData({
          ...formData,
          [name]: value, // Handle regular text, email, etc.
        });
      }
    },
    [formData]
  );

  // Handle form submission
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // Check if the privacy checkbox is checked
      if (!formData.privacy) {
        // If privacy checkbox is not checked, prevent form submission
        alert(
          'You must agree to the privacy policy before submitting the form.'
        );
        return; // Prevent submission if privacy is not agreed upon
      }

      // Create FormData object
      const formDataToSend = new FormData();
      formDataToSend.append('nome', formData.nome);
      formDataToSend.append('cognome', formData.cognome);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('telefono', formData.telefono);
      formDataToSend.append('targa', formData.targa);
      formDataToSend.append('modello', formData.modello);
      formDataToSend.append('compagnia', formData.compagnia);
      formDataToSend.append('indirizzo', formData.indirizzo);
      formDataToSend.append('cap', formData.cap);
      formDataToSend.append('data', formData.data);
      formDataToSend.append('privacy', formData.privacy.toString());

      // If file exists, append it to the FormData
      if (formData.file) {
        formDataToSend.append('file', formData.file);
      }

      try {
        const response = await fetch('/api/send-email', {
          method: 'POST',
          body: formDataToSend, // Send as FormData
        });

        if (response.ok) {
          console.log('Email sent successfully');
        } else {
          console.log('Failed to send email');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },
    [formData]
  );

  return { formData, handleInputChange, handleSubmit };
};
