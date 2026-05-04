import type { FC } from 'react';
import React from 'react';

import styles from './Win95Error.module.scss';

type Win95ErrorProps = {
  message: string;
  className?: string;
};

export const Win95Error: FC<Win95ErrorProps> = ({ message, className = '' }) => {
  if (!message) {
    return null;
  }

  return <div className={`${styles.win95Error} ${className}`}>{message}</div>;
};
