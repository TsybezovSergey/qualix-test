import styles from './Win95Label.module.scss';

type Win95LabelProps = {
  children: React.ReactNode;
  htmlFor?: string;
  className?: string;
  required?: boolean;
};

export const Win95Label: React.FC<Win95LabelProps> = ({ children, htmlFor, className = '', required = false }) => (
  <label htmlFor={htmlFor} className={`${styles.win95Label} ${className}`}>
    {children}
    {required && <span className={styles.required}> *</span>}
  </label>
);
