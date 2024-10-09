import { homepageSliderImages, sliderSettings } from '@/utils/slider';
import Slider from 'react-slick';

export const ImageSlider = () => (
  <div
    style={{ width: '100%', height: 'calc(100vh - 198px)', overflow: 'hidden' }}
  >
    <Slider {...sliderSettings}>
      {homepageSliderImages.map((image, index) => (
        <div key={index} style={{ height: 'calc(100vh - 198px)' }}>
          <img
            src={image}
            alt={`Slide ${index}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      ))}
    </Slider>
  </div>
);
