import { Metadata } from 'next';
import WorkspaceList from '@/components/WorkspaceList';

type Props = {
  params: { city: string }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Best Coworking Spaces in ${params.city}`,
    description: `Discover the top coworking spaces and workspaces in ${params.city}. Find your perfect work environment today!`,
  };
}

export default function CityWorkspaces({ params }: Props) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Best Coworking Spaces in {params.city}</h1>
      <WorkspaceList city={params.city} />
    </div>
  );
}

export async function generateStaticParams() {
  // Fetch popular cities from your database or a predefined list
  const popularCities = ['New York', 'London', 'Tokyo', 'Paris', 'Berlin'];

  return popularCities.map((city) => ({
    city: city.toLowerCase().replace(' ', '-'),
  }));
}