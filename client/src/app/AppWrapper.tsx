import Admin from '@/app/pages/admin';
import Home from '@/app/pages/home';
import Login from '@/app/pages/login';
import Sections from '@/app/pages/sections';
import Services from '@/app/pages/services';
import Car from '@/features/car';
import Footer from '@/features/footer';
import Header from '@/features/header';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

const AppWrapper = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const location = useLocation();

  const hideHeaderFooter =
    location.pathname.includes('/admin') ||
    location.pathname.includes('/login');

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/automobili/:sectionId" element={<Sections />} />
          <Route path="/servizi/:sectionId" element={<Services />} />
          <Route path="/automobili/:sectionId/:carSlug" element={<Car />} />

          {/* Protected Admin Route */}
          <Route
            path="/admin"
            element={
              isLoggedIn ? (
                <Admin />
              ) : (
                <Navigate to="/login" replace state={{ from: location }} />
              )
            }
          />

          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      {!hideHeaderFooter && <Footer />}
    </>
  );
};

export default AppWrapper;
