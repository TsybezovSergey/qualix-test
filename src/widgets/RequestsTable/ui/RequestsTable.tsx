import { columns } from '../const';

import styles from './RequestsTable.module.scss';

import type { RequestItem } from '@/entities/Request';
import { useRequestStore } from '@/entities/Request';
import { Win95Button, Win95Card, Win95Table } from '@/shared/ui';

type RequestsTableProps = {
  onCreateClick: () => void;
  onRowClick: (record: RequestItem) => void;
};

export function RequestsTable({ onCreateClick, onRowClick }: RequestsTableProps) {
  const requestsStore = useRequestStore();

  return (
    <Win95Card title="Taблица заявок" footer={<Win95Button onClick={onCreateClick}>Создать заявку</Win95Button>}>
      <Win95Table
        className={styles.requestsTable}
        columns={columns}
        dataSource={requestsStore.requests}
        rowKey="id"
        onRow={(record) => ({
          onClick: () => onRowClick(record),
        })}
      />
    </Win95Card>
  );
}
