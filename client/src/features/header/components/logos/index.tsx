// Required for vite svg plugin in TS files.
/// <reference types="vite-plugin-svgr/client" />

import SuperCarImg from '@/features/header/components/logos/assets/car.svg?react';
import CarrozzeriaImg from '@/features/header/components/logos/assets/carrozzeria.svg?react';
import GommistaImg from '@/features/header/components/logos/assets/gommista.svg?react';
import InsuranceImg from '@/features/header/components/logos/assets/insurance.svg?react';
import RentImg from '@/features/header/components/logos/assets/noleggio.svg?react';

export const SuperCarLogo = () => <SuperCarImg height={50} width={55} />;
export const CarrozzeriaLogo = () => <CarrozzeriaImg height={50} width={45} />;
export const InsuranceLogo = () => <InsuranceImg height={50} width={45} />;
export const GommistaLogo = () => <GommistaImg height={50} width={45} />;
export const RentLogo = () => <RentImg height={50} width={40} />;
