import AppWrapper from '@/app/AppWrapper';
import { Loader } from '@/components/loader';
import { auth } from '@/firebase';
import { useToast } from '@/hooks/useToast';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const App: React.FC = () => {
  const { showError } = useToast();
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 2,
            refetchOnWindowFocus: false,
            staleTime: 60 * 1000 * 5,
          },
        },
        queryCache: new QueryCache({
          onError: (_, query) => {
            if (query?.meta?.errorMessage) {
              showError(query.meta.errorMessage as string);
            }
          },
        }),
      }),
    []
  );

  // State to track authentication status
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState<boolean>(true);

  // Firebase Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        // User is logged in
        setIsLoggedIn(true);
      } else {
        // User is logged out
        setIsLoggedIn(false);
      }
      setAuthLoading(false); // Stop loading once the auth state is known
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  if (authLoading) {
    // You can add a loading spinner here if needed
    return <Loader />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppWrapper isLoggedIn={isLoggedIn} />
      </Router>
      <ToastContainer />
    </QueryClientProvider>
  );
};

export default App;
