import * as Yup from 'yup';

export const SearchPhotosSchema = Yup.object({
  searchTerm: Yup.string(),
});