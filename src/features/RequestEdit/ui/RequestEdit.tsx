import type { FC, ReactNode } from 'react';

import { useRequestStore } from '@/entities/Request';
import { RequestForm, type RequestFormData } from '@/entities/Request/ui/RequestForm';

type RequestEditProps = {
  id: string;
  onSuccess: () => void;
  extraActions: ReactNode[];
};

export const RequestEdit: FC<RequestEditProps> = ({ id, onSuccess, extraActions }) => {
  const requestsStore = useRequestStore();

  const request = requestsStore.getRequestById(id);

  const onSaveRequest = (data: RequestFormData) => {
    requestsStore.updateRequest(data.id!, data);
    onSuccess();
  };

  return (
    <RequestForm
      title="Просмотр заявки"
      initialData={request}
      onSubmit={onSaveRequest}
      submitText="Редактировать заявку"
      extraActions={extraActions}
    />
  );
};
