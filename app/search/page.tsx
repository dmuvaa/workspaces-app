'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import WorkspaceList from '@/components/WorkspaceList';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface Workspace {
  id: number;
  name: string;
  amenities: string[];
  officeTypes: string[];
}

interface Filters {
  amenities: string[];
  officeTypes: string[];
}

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [filters, setFilters] = useState<Filters>({ amenities: [], officeTypes: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timeout = setTimeout(fetchWorkspaces, 300); // Debounced fetch
    return () => clearTimeout(timeout);
  }, [query, filters]);

  async function fetchWorkspaces(): Promise<void> {
    setLoading(true);
    setError(null);

    try {
      let supabaseQuery = supabase
        .from('workspaces')
        .select('*')
        .ilike('name', `%${query}%`);

      if (filters.amenities.length > 0) {
        supabaseQuery = supabaseQuery.contains('amenities', filters.amenities);
      }

      if (filters.officeTypes.length > 0) {
        supabaseQuery = supabaseQuery.contains('officeTypes', filters.officeTypes);
      }

      const { data, error } = await supabaseQuery;

      if (error) throw error;

      setWorkspaces(data || []);
    } catch (err) {
      console.error('Error fetching workspaces:', err);
      setError('Failed to fetch workspaces. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  const handleFilterChange = (category: keyof Filters, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [category]: prevFilters[category].includes(value)
        ? prevFilters[category].filter((item) => item !== value)
        : [...prevFilters[category], value],
    }));
  };

  return (
    <div className="flex">
      <div className="w-1/4 pr-6">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <div className="space-y-4">
          <div>
            <Label className="text-lg">Amenities</Label>
            {['WiFi', 'Meeting Rooms', 'Parking', 'Coffee'].map((amenity) => (
              <div key={amenity} className="flex items-center">
                <Checkbox
                  id={`amenity-${amenity}`}
                  checked={filters.amenities.includes(amenity)}
                  onCheckedChange={() => handleFilterChange('amenities', amenity)}
                />
                <label htmlFor={`amenity-${amenity}`} className="ml-2">
                  {amenity}
                </label>
              </div>
            ))}
          </div>
          <div>
            <Label className="text-lg">Office Types</Label>
            {['Private Office', 'Open Space', 'Meeting Room', 'Virtual Office'].map((type) => (
              <div key={type} className="flex items-center">
                <Checkbox
                  id={`type-${type}`}
                  checked={filters.officeTypes.includes(type)}
                  onCheckedChange={() => handleFilterChange('officeTypes', type)}
                />
                <label htmlFor={`type-${type}`} className="ml-2">
                  {type}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-3/4">
        <h1 className="text-3xl font-bold mb-6">Search Results for &quot;{query}&quot;</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : workspaces.length === 0 ? (
          <p>No workspaces match your search criteria.</p>
        ) : (
          <WorkspaceList city={query} />
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<p>Loading search results...</p>}>
      <SearchResults />
    </Suspense>
  );
}
