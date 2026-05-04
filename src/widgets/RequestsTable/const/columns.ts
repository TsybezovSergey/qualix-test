import type { RequestItem } from '@/entities/Request';
import { simpleDay } from '@/shared/lib';
import type { Win95TableColumn } from '@/shared/ui';

export const columns: Win95TableColumn<RequestItem>[] = [
  { key: 'id', title: '', hidden: true },
  { key: 'title', title: 'Имя' },
  { key: 'createdAt', title: 'Дата создания', render: (date) => simpleDay(date.createdAt).format() },
];
