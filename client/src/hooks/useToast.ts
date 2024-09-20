import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useToast = () => {
  const showSuccess = (message: string) => {
    toast.success(message, {
      position: 'bottom-right',
      autoClose: 3000,
    });
  };

  const showError = (message: string) => {
    toast.error(message, {
      position: 'bottom-right',
      autoClose: 3000,
    });
  };

  return { showSuccess, showError };
};
