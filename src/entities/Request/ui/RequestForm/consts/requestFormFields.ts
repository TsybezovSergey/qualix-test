export enum FieldNames {
  Title = 'title',
  Description = 'description',
  Category = 'category',
}

export const requestFormLabels: Record<FieldNames, string> = {
  [FieldNames.Title]: 'Название заявки',
  [FieldNames.Description]: 'Описание заявки',
  [FieldNames.Category]: 'Категория заявки',
};
