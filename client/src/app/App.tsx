import Admin from '@/app/pages/admin';
import Home from '@/app/pages/home';
import Login from '@/app/pages/login';
import Sections from '@/app/pages/sections';
import Footer from '@/features/footer';
import Header from '@/features/header';
import { useToast } from '@/hooks/useToast';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { useMemo } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const App: React.FC = () => {
  const { showError } = useToast();
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 2, // Retry failed requests twice before showing an error
            refetchOnWindowFocus: false, // Avoid refetching on window focus
            staleTime: 60 * 1000 * 5, // Data considered fresh for DEFAULT_QUERY_CACHE_TIME
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

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servizi/:sectionId" element={<Sections />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
      <Footer />
      <ToastContainer />
    </QueryClientProvider>
  );
};

export default App;
