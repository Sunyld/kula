import data from '@/data/mockDashboard.json';
import OrderDetailClient from './OrderDetailClient';

export function generateStaticParams() {
  const { creator, advertiser } = data as any;
  const creatorOrderIds = creator.activeOrders.map((o: any) => o.id);
  const advertiserOrderIds = advertiser.campaigns.map((c: any) => c.id);
  const uniqueIds = Array.from(new Set([...creatorOrderIds, ...advertiserOrderIds]));

  return uniqueIds.map((id) => ({ id: String(id) }));
}

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  return <OrderDetailClient id={id} />;
}


