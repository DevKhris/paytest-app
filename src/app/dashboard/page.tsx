import { Suspense } from 'react';
import DashboardContent from '@/components/dashboard-content';
import LoadingFallback from '@/components/loading';

export default function Dashboard() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <DashboardContent />
    </Suspense>
  );
}
