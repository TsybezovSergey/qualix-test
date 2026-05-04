import { categoriesMap, Category } from '@/entities/Request';

export const categoriesOptions = Object.values(Category).map((category) => {
  return {
    label: categoriesMap[category],
    value: category,
  };
});
