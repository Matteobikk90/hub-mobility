import ContactForm from '@/components/contact-form';
import VideoMask from '@/components/video-mask';
import { ServicesId } from '@/types/services.types';
import { serviceData } from '@/utils/lists';
import { useParams } from 'react-router-dom';

export const Services = () => {
  const { sectionId } = useParams<{ sectionId: string }>();

  const currentSection =
    serviceData[sectionId as ServicesId] || serviceData.assicurazioni;

  return (
    <section>
      <VideoMask currentSection={currentSection} />
      <article className="flex flex-col gap-4 m-4 md:m-[2rem_auto] max-w-[70rem] p-4 text-black text-center">
        <h3 className="text-[3rem] font-medium">{currentSection.subtitle}</h3>
        <p className="text-[1.5rem]">{currentSection.description}</p>
      </article>
      <div className="bg-azzurro p-12">
        <div className="flex flex-col gap-4 rounded-md shadow-lg max-w-5xl mx-auto bg-white p-12">
          <h4 className="text-3xl">{currentSection.formTitle}</h4>
          <p>{currentSection.formText}</p>
          <ContactForm />
        </div>
      </div>
    </section>
  );
};
