import { navbarLinks } from '@/utils/lists';
import { Car, KeySquare, Shield, Star, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';

const iconMapping: Partial<Record<string, JSX.Element>> = {
  long: <KeySquare size={50} />,
  short: <KeySquare size={50} />,
  super: <Star size={50} />,
  carrozzeria: <Wrench size={50} />,
  officina: <Car size={50} />,
  assicurazioni: <Shield size={50} />,
};

export const Navbar = ({ isMenuOpen }: { isMenuOpen: boolean }) => {
  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center justify-around w-full">
        {navbarLinks.map(({ id, name, short }) => (
          <Link
            key={id}
            to={`/servizi/${id}`}
            className="flex flex-col items-center justify-between text-center hover:text-blue-middle"
          >
            <span className="flex items-center gap-2">
              {iconMapping[id]}
              {short && <span className="text-sm font-bold">{short}</span>}
            </span>
            <span className="text-lg font-regular">{name}</span>
          </Link>
        ))}
      </nav>

      {/* Mobile Navigation */}
      <nav
        className={`fixed md:hidden flex h-[calc(100%-7rem)] top-0 left-0 justify-evenly bg-grey-middle text-cream-middle flex-col items-center w-full transition-all duration-500 ease-in-out transform gap-3 ${
          isMenuOpen
            ? 'opacity-100 translate-y-[7rem]'
            : 'opacity-0 -translate-y-full'
        }`}
      >
        {navbarLinks.map(({ id, name, short }) => (
          <Link
            key={id}
            to={`/servizi/${id}`}
            className="w-full flex flex-col items-center justify-between text-center hover:bg-blue-middle"
          >
            <span className="flex items-center gap-2">
              {iconMapping[id]}
              {short && <span className="text-sm font-semibold">{short}</span>}
            </span>
            <span className="text-lg font-normal">{name}</span>
          </Link>
        ))}
      </nav>
    </>
  );
};
