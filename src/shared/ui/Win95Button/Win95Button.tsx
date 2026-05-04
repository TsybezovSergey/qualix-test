import type { FC, MouseEvent, PropsWithChildren } from 'react';

import styles from './Win95Button.module.scss';

export type Win95ButtonProps = PropsWithChildren<{
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}>;

export const Win95Button: FC<Win95ButtonProps> = ({ children, onClick, disabled = false, className = '', type }) => {
  const handleClick = (_e: MouseEvent<HTMLButtonElement>) => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <button
      type={type ?? 'button'}
      onClick={handleClick}
      disabled={disabled}
      className={`${styles.win95Button} ${className}`}
    >
      {children}
    </button>
  );
};
