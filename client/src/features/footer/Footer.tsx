import footerLogo from '@/assets/images/footerLogo.svg';
import Headquarters from '@/components/headquarters';
import Socials from '@/components/socials';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-cream-light px-4 py-12 gap-4 flex flex-col md:grid grid-cols-3 justify-between text-center md:text-start text-sm text-white">
      <img
        className="md:w-[28.125rem] m-auto"
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
