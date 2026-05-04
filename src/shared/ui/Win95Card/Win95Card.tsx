import type { FC, MouseEvent, ReactNode } from 'react';
import classnames from 'classnames/bind';

import { type WithClassName } from '../../types/generics';

import styles from './Win95Card.module.scss';

const cn = classnames.bind(styles);

export type Win95CardProps = WithClassName<{
  title: string;
  description?: string;

  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  footer?: ReactNode | ReactNode[];
  children?: ReactNode;
  className?: string;
  classNames?: {
    description?: string;
    modal?: string;
  };
}>;

export const Win95Card: FC<Win95CardProps> = ({
  title,
  description,
  onClick,
  children,
  footer,
  className,
  classNames,
}) => (
  <div onClick={onClick} className={className ?? ''}>
    <div className={cn(styles.win95Modal, classNames?.modal)}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
      </div>

      <div className={styles.content}>
        {description && <p className={cn(styles.description, classNames?.description)}>{description}</p>}

        {children}

        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>
  </div>
);
