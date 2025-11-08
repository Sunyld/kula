import channels from '@/data/mockChannels.json';
import AvailabilityClient from './AvailabilityClient';

export function generateStaticParams() {
  const list = channels as any[];
  return list.map((channel) => ({ id: String(channel.id) }));
}

export default function AvailabilityPage({ params }: { params: { id: string } }) {
  return <AvailabilityClient params={params} />;
}


