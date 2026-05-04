import s from './UnknownError.module.scss';

export function UnknownError() {
  return (
    <div className={s.unknownError}>
      <div className={s.title}>Произошла неизвестная ошибка</div>
      <div className={s.text}>Попробуйте вернуться на предыдущую страницу или повторите действие заново</div>
    </div>
  );
}
