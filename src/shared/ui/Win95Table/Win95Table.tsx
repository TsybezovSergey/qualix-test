import type { ReactNode } from 'react';
import React from 'react';
import classnames from 'classnames/bind';

import styles from './Win95Table.module.scss';

export type Win95TableColumn<T> = {
  key: keyof T | string;
  title: string;
  render?: (record: T, index: number) => ReactNode;
  hidden?: boolean;
};

const cn = classnames.bind(styles);

type Win95TableProps<T> = {
  columns: Win95TableColumn<T>[];
  dataSource: T[];
  rowKey?: keyof T | ((record: T) => string);
  onRow?: (record: T, index: number) => void;
  className?: string;
  noDataPlaceholder?: ReactNode;
};

export const Win95Table = <T extends Record<string, unknown>>({
  columns,
  dataSource,
  rowKey,
  onRow,
  className = '',
  noDataPlaceholder = 'Нет данных',
}: Win95TableProps<T>) => {
  const getRowKey = (record: T, index: number): string => {
    if (rowKey && typeof rowKey === 'string') {
      return String(record[rowKey]);
    }
    if ('id' in record && typeof record.id === 'string') {
      return record.id as string;
    }
    if ('id' in record && typeof record.id === 'number') {
      return String(record.id);
    }
    return String(index);
  };

  const columnsWithoutHidden = columns.filter((col) => !col.hidden);
  const hasData = dataSource.length > 0;

  return (
    <div className={cn(styles.win95Table, className)}>
      {hasData ? (
        <table className={styles.table}>
          <thead>
            <tr>
              {columnsWithoutHidden.map((col) => (
                <th key={String(col.key)} className={styles.th}>
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataSource.map((record, idx) => {
              const rowProps = onRow?.(record, idx) ?? {};
              const rowKeyValue = getRowKey(record, idx);
              return (
                <tr key={rowKeyValue} {...rowProps} className={styles.tr}>
                  {columnsWithoutHidden.map((col) => {
                    const cellValue = col.key as keyof T;
                    const content = col.render ? col.render(record, idx) : record[cellValue];
                    return (
                      <td key={String(col.key)} className={styles.td}>
                        {content as ReactNode}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        noDataPlaceholder
      )}
    </div>
  );
};
