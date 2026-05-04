import { useNavigate } from 'react-router-dom';

import { useRequestStore } from '@/entities/Request';
import { RouterPaths } from '@/shared/consts';
import { Win95Button } from '@/shared/ui';

type RequestDeleteProps = {
  id: string;
};

export const RequestDelete = ({ id }: RequestDeleteProps) => {
  const { deleteRequest } = useRequestStore();
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteRequest(id);
    navigate(`/${RouterPaths.Requests}`);
  };

  return <Win95Button onClick={handleDelete}>Удалить заявку</Win95Button>;
};
