import { useNavigate } from 'react-router-dom';

import { RequestCreate } from '@/features/RequestCreate';
import { RouterPaths } from '@/shared/consts';

export function RequestNew() {
  const navigate = useNavigate();

  const toRootRoute = () => navigate(`/${RouterPaths.Requests}`);

  return <RequestCreate onSuccess={toRootRoute} />;
}
