import { selectOptions } from './lists';

type SectionId =
  | 'super-car'
  | 'noleggio-breve-termine'
  | 'noleggio-lungo-termine';

export const generateSlug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with dashes
    .replace(/(^-|-$)+/g, ''); // Remove leading/trailing dashes

export const formatTitle = (text: string) =>
  text.replaceAll('-', ' ').toLocaleUpperCase();

export const generatePriceCombinations = (sectionId: SectionId) => {
  const kilometriOptions = selectOptions[sectionId]?.kilometres || [];
  const durationOptions = selectOptions[sectionId]?.duration || [];
  const anticipoOptions = selectOptions[sectionId]?.anticipo || [];

  const combinations = [];
  for (const kilometri of kilometriOptions) {
    for (const duration of durationOptions) {
      for (const anticipo of anticipoOptions) {
        combinations.push({ kilometri, duration, anticipo });
      }
    }
  }
  return combinations;
};
