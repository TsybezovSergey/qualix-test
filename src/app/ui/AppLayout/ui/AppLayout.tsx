import { Outlet } from 'react-router-dom';

import s from './AppLayout.module.scss';

export const AppLayout = () => {
  return (
    <main className={s.appLayout}>
      <header>Шапка</header>
      <Outlet />
    </main>
  );
};
