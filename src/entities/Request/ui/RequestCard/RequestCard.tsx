import type { FC } from 'react';

import { categoriesMap } from '../../consts';
import type { RequestItem } from '../../model';

import { simpleDay } from '@/shared/lib';
import type { Win95CardProps } from '@/shared/ui';
import { Win95Card } from '@/shared/ui';

type RequestCardProps = {
  item: RequestItem;
  footer: Win95CardProps['footer'];
};

export const RequestCard: FC<RequestCardProps> = ({ item, footer }: RequestCardProps) => {
  return (
    <Win95Card title="Карточка" footer={footer}>
      Идентификатор: <strong>{item.id}</strong>
      <br /> Название: {item.title}
      <br /> Описание: {item.description}
      <br /> Категория: {item.category ? categoriesMap[item.category] : 'Не установлено'}
      <br /> Дата создания: {simpleDay(item.createdAt).format()}
      <br />
    </Win95Card>
  );
};
