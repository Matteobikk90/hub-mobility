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
  </div>
);
