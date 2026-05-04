import { Win95Card } from '@/shared/ui';

export function ErrorPage() {
  return (
    <Win95Card title="Упс...">
      <span style={{ fontSize: 24, fontStyle: 'bold' }}>Техническая ошибка</span>
    </Win95Card>
  );
}
