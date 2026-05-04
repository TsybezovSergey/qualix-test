import { useRequestViewModeStore } from '@/features/RequestView/model';
import { Win95Button } from '@/shared/ui';

export const RequestView = () => {
  const { setViewMode } = useRequestViewModeStore();

  return <Win95Button onClick={setViewMode}>В режим просмотра</Win95Button>;
};
