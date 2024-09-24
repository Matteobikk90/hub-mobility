import { VideoMaskProps } from '@/components/video-mask/video-mask.types';

export const VideoMask = ({ currentSection }: VideoMaskProps) => (
  <div className="grid grid-cols-1 grid-rows-1 h-[calc(100vh-228px)]">
    <video
      src={currentSection.videoUrl}
      className="w-full h-full object-cover col-start-1 row-start-1"
      autoPlay
      playsInline
      muted
      loop
    />
    <div className="bg-mask col-start-1 row-start-1 flex items-center justify-start p-4">
      <h2 className="text-3xl md:text-[4rem] font-medium text-white border-b-2 border-white p-4 animate-slide-in-left">
        {currentSection.title}
      </h2>
    </div>
  </div>
);
