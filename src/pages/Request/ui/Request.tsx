import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useRequestViewModeStore } from '../../../features/RequestView/model';

import { RequestCard, RequestEmpty, useRequestStore } from '@/entities/Request';
import { RequestDelete } from '@/features/RequestDelete';
import { RequestEdit } from '@/features/RequestEdit';
import { RequestView } from '@/features/RequestView';
import { RouterPaths } from '@/shared/consts';
import { Win95Button } from '@/shared/ui';

export function Request() {
  const { setEditMode, setViewMode, getIsView } = useRequestViewModeStore();

  const { id } = useParams<{ id: string }>();
  const requestsStore = useRequestStore();
  const navigate = useNavigate();

  const toRootRoute = () => navigate(`/${RouterPaths.Requests}`);

  const request = requestsStore.getRequestById(String(id));

  useEffect(() => {
    return setViewMode;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!id || !request) {
    return <RequestEmpty id={id} />;
  }

  if (getIsView()) {
    return (
      <RequestCard item={request} footer={<Win95Button onClick={setEditMode}>Редактировать заявку</Win95Button>} />
    );
  }

  return (
    <RequestEdit
      id={id}
      onSuccess={toRootRoute}
      extraActions={[<RequestDelete id={request.id} key={'delete'} />, <RequestView key={'view'} />]}
    />
  );
}
