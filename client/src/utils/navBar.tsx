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

export const renderNavBarLinks = (isMobile: boolean, toggleMenu: () => void) =>
  navbarLinks.map(({ id, path, name }, index) => (
    <Link
      key={path}
      to={index <= 2 ? `/automobili/${path}` : `/servizi/${path}`}
      className={`flex flex-col items-center text-center text-white hover:text-azzurro ${
        isMobile
          ? 'flex-1 w-full hover:bg-azzurro hover:text-black justify-center gap-2'
          : 'h-[3.45rem] justify-between gap-2'
      }`}
      onClick={isMobile ? toggleMenu : undefined} // Only close menu on mobile
    >
      <span className="flex items-center gap-2">{iconMapping[id]}</span>
      <span className="text-sm font-regular uppercase">{name}</span>
    </Link>
  ));
