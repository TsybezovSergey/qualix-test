import { useEffect, useRef, useState } from 'react';
import classnames from 'classnames/bind';

import styles from './Win95Select.module.scss';

import type { WithClassName } from '@/shared/types/generics';

const cn = classnames.bind(styles);

export type Win95SelectOption<T extends string> = {
  label: string;
  value: T;
};

type Win95SelectProps<T extends string> = WithClassName<{
  id?: string;
  options: Win95SelectOption<T>[];
  value?: T;
  onChange?: (value: T) => void;
  placeholder?: string;
  disabled?: boolean;
  name?: string;
  onBlur?: () => void;
}>;

export const Win95Select = <T extends string>({
  id,
  options,
  value,
  onChange,
  placeholder = '',
  disabled = false,
  className = '',
  name,
  onBlur,
}: Win95SelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        onBlur?.();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onBlur]);

  const handleSelect = (optValue: T) => {
    onChange?.(optValue);
    setIsOpen(false);
    inputRef.current?.focus();
    onBlur?.();
  };

  const handleInputClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div ref={containerRef} className={cn(styles.selectContainer, className)}>
      <input
        id={id}
        ref={inputRef}
        type="text"
        name={name}
        className={styles.input}
        value={selectedOption ? selectedOption.label : ''}
        placeholder={placeholder}
        readOnly
        disabled={disabled}
        onClick={handleInputClick}
        onBlur={onBlur}
      />
      <span className={styles.arrow}>▼</span>

      {isOpen && !disabled && (
        <ul className={styles.dropdown}>
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={opt.value === value ? styles.optionSelected : styles.option}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
