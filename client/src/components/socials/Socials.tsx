import { socials } from '@/utils/lists';

export const Socials = () => (
  <div className="flex flex-col gap-3">
    <h3 className="text-grey-light uppercase text-azzurro">
      <strong>Social media</strong>
    </h3>
    <ul className="flex gap-4 m-auto md:m-0">
      {socials.map(({ name, url, icon }) => (
        <li
          key={name}
          className="bg-white text-azzurro rounded-full w-9 h-9 flex items-center justify-center hover:bg-azzurro hover:text-white"
        >
          <a
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
          >
            {icon}
          </a>
        </li>
      ))}
    </ul>
    <h4 className="text-grey-light uppercase text-azzurro pt-4">
      <strong>Contatti</strong>
    </h4>
    <div className="flex flex-col text-xs gap-4">
      <span>
        email:{' '}
        <a
          className="hover:text-azzurro focus:text-azzurro"
          href="mailto:amministrazione@hubmobility.it"
        >
          amministrazione@hubmobility.it
        </a>
      </span>
      <span>
        tel:{' '}
        <a
          className="hover:text-azzurro focus:text-azzurro"
          href="tel:+393333527953"
        >
          3333527953
        </a>
      </span>
      <span>
        pec:{' '}
        <a
          className="hover:text-azzurro focus:text-azzurro"
          href="mailto:hub@casellapoec.com"
        >
          hub@casellapoec.com
        </a>
      </span>
      <span className="text-azzurro">p.iva: 12513480017</span>
    </div>
  </div>
);
