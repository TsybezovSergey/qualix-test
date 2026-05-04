import type { FC } from 'react';

import { useRequestStore } from '@/entities/Request';
import { RequestForm, type RequestFormData } from '@/entities/Request/ui/RequestForm';

type RequestCreateProps = {
  onSuccess: () => void;
};

export const RequestCreate: FC<RequestCreateProps> = ({ onSuccess }) => {
  const requestsStore = useRequestStore();

  const onSaveRequest = (data: RequestFormData) => {
    requestsStore.addRequest(data);
    onSuccess();
  };

  return <RequestForm submitText="Создать заявку" title="Создание новой заявки" onSubmit={onSaveRequest} />;
};
