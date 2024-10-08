export const generateSlug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with dashes
    .replace(/(^-|-$)+/g, ''); // Remove leading/trailing dashes

export const formatTitle = (text: string) =>
  text.replaceAll('-', ' ').toLocaleUpperCase();
