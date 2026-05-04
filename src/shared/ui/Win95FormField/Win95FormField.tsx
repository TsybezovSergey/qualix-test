import { cloneElement, type FC, type ReactElement } from 'react';

import { Win95Error } from '../Win95Error/Win95Error';
import { Win95Label } from '../Win95Label';

import styles from './Win95FormField.module.scss';

type WithId = {
  id?: string;
};

type FormFieldProps = {
  name: string;
  label: string;
  error?: string;
  required?: boolean;
  children: ReactElement<WithId>;
};

export const Win95FormField: FC<FormFieldProps> = ({ name, label, children, error, required }) => (
  <fieldset className={styles.formField}>
    <legend>
      <Win95Label htmlFor={name}>
        {label} {required && <span className={styles.requiredStar}> *</span>}
      </Win95Label>
    </legend>
    {cloneElement(children, { id: name })}
    {error && <Win95Error message={error} />}
  </fieldset>
);
