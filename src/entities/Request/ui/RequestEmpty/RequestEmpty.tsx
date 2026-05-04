import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Win95Button, Win95Card } from '@/shared/ui';

type RequestEmptyProps = {
  id?: string;
};

export const RequestEmpty: FC<RequestEmptyProps> = ({ id }) => {
  const navigate = useNavigate();
  const onBack = () => {
    navigate(-1);
  };
  return (
    <Win95Card title="Упс..." footer={<Win95Button onClick={onBack}>Назад</Win95Button>}>
      К сожалению, мы не нашли данную заявку c идентификатором {id ?? '-'}
    </Win95Card>
  );
};
