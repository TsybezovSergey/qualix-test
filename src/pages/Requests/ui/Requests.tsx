import { useNavigate } from 'react-router-dom';

import type { RequestItem } from '@/entities/Request';
import { RouterPaths } from '@/shared/consts';
import { RequestsTable } from '@/widgets/RequestsTable/ui';

export function Requests() {
  const navigate = useNavigate();
  const navigateToRequestNew = () => {
    navigate(RouterPaths.NewCard);
  };
  const navigateToRequest = (record: RequestItem) => {
    navigate(record.id);
  };

  return <RequestsTable onCreateClick={navigateToRequestNew} onRowClick={navigateToRequest} />;
}
