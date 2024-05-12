export { default as httpRequest } from './httpRequest';
export { default as urlHandler } from './urlHandler';
export { default as filterIdNos } from './filterIdNos';
export const createMarkup = (value: string): { __html: string } => ({
  __html: value,
});
export default {};
