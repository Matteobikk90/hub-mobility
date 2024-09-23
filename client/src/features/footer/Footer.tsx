import footerLogo from '@/assets/images/footerLogo.svg';
import Headquarters from '@/components/headquarters';
import Socials from '@/components/socials';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-middle text-cream-light p-4 gap-4 flex flex-col items-center md:items-start md:grid grid-cols-3 justify-between text-center md:text-start">
      <img
        className="md:w-[28.125rem]"
        width={200}
        src={footerLogo}
        alt="Hub Mobility Services"
        loading="lazy"
      />
      <Headquarters />
      <Socials />
    </footer>
  );
};
