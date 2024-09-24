import {
  CarrozzeriaLogo,
  GommistaLogo,
  InsuranceLogo,
  RentLogo,
  SuperCarLogo,
} from '@/features/header/components/logos';
import { navbarLinks } from '@/utils/lists';
import { Link } from 'react-router-dom';

const iconMapping: Partial<Record<string, JSX.Element>> = {
  long: <RentLogo />,
  short: <RentLogo />,
  super: <SuperCarLogo />,
  carrozzeria: <CarrozzeriaLogo />,
  officina: <GommistaLogo />,
  assicurazioni: <InsuranceLogo />,
};

export const Navbar = ({ isMenuOpen }: { isMenuOpen: boolean }) => {
  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center justify-around w-full">
        {navbarLinks.map(({ id, path, name }, index) => (
          <Link
            key={path}
            to={index <= 2 ? `/automobili/${path}` : `/servizi/${path}`}
            className="flex flex-col items-center justify-between text-center text-white hover:text-azzurro"
          >
            <span className="h-[3.45rem] flex items-center gap-2">
              {iconMapping[id]}
            </span>
            <span className="text-lg font-regular">{name}</span>
          </Link>
        ))}
      </nav>

      {/* Mobile Navigation */}
      <nav
        className={`z-10 fixed md:hidden flex h-[calc(100%-7rem)] top-0 left-0 justify-evenly bg-black text-white flex-col items-center w-full transition-all duration-500 ease-in-out transform gap-3 ${
          isMenuOpen
            ? 'opacity-100 translate-y-[7rem]'
            : 'opacity-0 -translate-y-full'
        }`}
      >
        {navbarLinks.map(({ id, path, name }, index) => (
          <Link
            key={path}
            to={index <= 2 ? `/automobili/${path}` : `/servizi/${path}`} // Use path for dynamic routing
            className="flex flex-col items-center justify-between text-center text-white hover:text-azzurro"
          >
            <span className="flex items-center gap-2">{iconMapping[id]}</span>
            <span className="text-lg font-regular">{name}</span>
          </Link>
        ))}
      </nav>
    </>
  );
};
