import type { FC, ReactNode, SubmitEventHandler } from 'react';
import { useState } from 'react';

import { categoriesOptions, FieldNames, requestFormLabels } from '../consts';

import styles from './RequestForm.module.scss';

import type { Category } from '@/entities/Request/consts';
import { formErrors } from '@/shared/consts';
import { Win95Button, Win95Card, Win95FormField, Win95Input, Win95Select } from '@/shared/ui';

export type RequestFormData = {
  id?: string;
  title: string;
  description: string;
  category?: Category;
};

type RequestFormDataErrors = Partial<RequestFormData>;

type RequestFormProps = {
  title: string;
  initialData?: RequestFormData;
  onSubmit: (data: RequestFormData) => void;
  submitText: string;
  extraActions?: ReactNode[];
};

const DEFAULT_VALUES: RequestFormData = {
  title: '',
  description: '',
};

export const RequestForm: FC<RequestFormProps> = ({ title, initialData, onSubmit, extraActions, submitText }) => {
  const [fields, setFields] = useState<RequestFormData>(initialData ?? DEFAULT_VALUES);
  const [errors, setErrors] = useState<RequestFormDataErrors>({});
  const [isTouched, setIsTouched] = useState(false);

  const handleSubmit: SubmitEventHandler = (event) => {
    const { id, title, description, category } = fields;
    const errors: RequestFormDataErrors = {};
    event.preventDefault();

    if (!title.trim()) {
      errors.title = formErrors.required;
    }
    if (!description.trim()) {
      errors.description = formErrors.required;
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    onSubmit({ id, title: title.trim(), description: description.trim(), category });
  };

  const onChange = <K extends keyof RequestFormData>(field: K, value: RequestFormData[K]) => {
    setIsTouched(true);
    setFields((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const getOnChange =
    <K extends keyof RequestFormData>(fieldName: K) =>
    (value: RequestFormData[K]) =>
      onChange(fieldName, value);

  return (
    <form onSubmit={handleSubmit}>
      <Win95Card
        title={title}
        footer={[
          ...(extraActions ?? []),
          <Win95Button disabled={!isTouched} key="rootBtn" type="submit" className={styles.button}>
            {submitText}
          </Win95Button>,
        ]}
      >
        <div className={styles.field}>
          <Win95FormField
            name={FieldNames.Title}
            error={errors.title}
            required
            label={requestFormLabels[FieldNames.Title]}
          >
            <Win95Input
              id={FieldNames.Title}
              className={styles.formField}
              value={fields.title}
              placeholder="Введите название заявки"
              onChange={getOnChange(FieldNames.Title)}
            />
          </Win95FormField>
        </div>
        <div className={styles.field}>
          <Win95FormField
            name={FieldNames.Description}
            error={errors.description}
            required
            label={requestFormLabels[FieldNames.Description]}
          >
            <Win95Input
              id={FieldNames.Description}
              className={styles.formField}
              value={fields.description}
              placeholder="Введите описание заявки"
              onChange={getOnChange(FieldNames.Description)}
            />
          </Win95FormField>
        </div>
        <div className={styles.field}>
          <Win95FormField
            name={FieldNames.Category}
            error={errors.category}
            label={requestFormLabels[FieldNames.Category]}
          >
            <Win95Select
              id={FieldNames.Category}
              className={styles.formField}
              value={fields.category}
              options={categoriesOptions}
              placeholder="Введите категорию заявки"
              onChange={getOnChange(FieldNames.Category)}
            />
          </Win95FormField>
        </div>
      </Win95Card>
    </form>
  );
};
