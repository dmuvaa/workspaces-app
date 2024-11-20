import type { Metadata } from 'next';
import WorkspaceList from '@/components/WorkspaceList';

type Props = {
  params: { city: string };
};

// Helper function to generate slugs for city names
const toSlug = (city: string): string => city.toLowerCase().replace(/\s+/g, '-');

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (params.city === 'favicon.ico') {
    return {}; // Return empty metadata for favicon.ico
  }
  return {
    title: `Best Coworking Spaces in ${params.city}`,
    description: `Discover the top coworking spaces and workspaces in ${params.city}. Find your perfect work environment today!`,
  };
}

export default function CityWorkspaces({ params }: Props): JSX.Element | null {
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

export async function generateStaticParams(): Promise<Array<{ city: string }>> {
  // Fetch popular cities from your database or use a predefined list
  const popularCities: readonly string[] = ['New York', 'London', 'Tokyo', 'Paris', 'Berlin'] as const;

  // Add special cases for the "new-workspace" route and favicon.ico
  return [
    { city: 'new-workspace' },
    { city: 'favicon.ico' }, // Handle favicon.ico path
    ...popularCities.map((city) => ({
      city: toSlug(city),
    })),
  ];
}
