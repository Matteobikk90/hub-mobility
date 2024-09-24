import { locations } from '@/utils/lists';
import { MapPin } from 'lucide-react';

export const Headquarters = () => (
  <div className="flex flex-col gap-2">
    <h3 className="text-azzurro uppercase">
      <strong>Headquartier</strong>
    </h3>
    <div className="flex items-center gap-2 text-xs text-white">
      <MapPin className="w-6 h-6" color="#ffffff" />
      <h4>{locations[0].city}</h4>
    </div>
    <h4 className="text-azzurro uppercase">
      <strong>Sedi</strong>
    </h4>
    <ul className="flex flex-col gap-2">
      {locations.slice(1).map(({ city }, index) => (
        <li key={index}>
          <div className="flex items-center gap-2 text-xs text-white">
            <MapPin className="w-6 h-6" color="#ffffff" />
            <h5>{city}</h5>
          </div>

          {/* <div className="flex items-center">
            <Phone className="w-6 h-6 " />
            <a href={`tel:${phone}`} className=" underline">
              {phone}
            </a>
          </div>

          {whatsapp && (
            <div className="flex items-center">
              <MessageCircle className="w-6 h-6 text-green-500" />
              <a href={`https://wa.me/${whatsapp}`} className=" underline">
                {whatsapp}
              </a>
            </div>
          )}

          {email && (
            <div className="flex items-center">
              <Mail className="w-6 h-6 " />
              <a href={`mailto:${email}`} className=" underline">
                {email}
              </a>
            </div>
          )}

          <div className="flex items-center">
            <Clock className="w-6 h-6 " />
            <span>{hours}</span>
          </div> */}
        </li>
      ))}
    </ul>
  </div>
);
