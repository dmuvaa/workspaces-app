import { Metadata } from 'next';
import WorkspaceList from '@/components/WorkspaceList';

type Props = {
  params: { city: string }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (params.city === 'favicon.ico') {
    return {}; // Return empty metadata for favicon.ico
  }
  return {
    title: `Best Coworking Spaces in ${params.city}`,
    description: `Discover the top coworking spaces and workspaces in ${params.city}. Find your perfect work environment today!`,
  };
}

export default function CityWorkspaces({ params }: Props) {
  if (params.city === 'favicon.ico') {
    return null; // Return null for favicon.ico
  }
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

  // Add special cases for the "new-workspace" route and favicon.ico
  return [
    { city: 'new-workspace' },
    { city: 'favicon.ico' }, // Add favicon.ico to the list of paths
    ...popularCities.map((city) => ({
      city: city.toLowerCase().replace(' ', '-'),
    })),
  ];
}