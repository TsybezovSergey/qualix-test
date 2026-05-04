import type { ChangeEvent, FC, InputHTMLAttributes } from 'react';
import classnames from 'classnames/bind';

import styles from './Win95Input.module.scss';

const cn = classnames.bind(styles);

type Win95InputProps = {
  onChange?: (value: string) => void;
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

export const Win95Input: FC<Win95InputProps> = ({ onChange, className = '', ...rest }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement> | string) => {
    if (onChange) {
      if (typeof e === 'string') {
        onChange(e);
      } else {
        onChange(e.target.value);
      }
    }
  };

  return <input {...rest} onChange={handleChange} className={cn(styles.win95Input, className)} />;
};
