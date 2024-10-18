'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import WorkspaceList from '@/components/WorkspaceList';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [workspaces, setWorkspaces] = useState([]);
  const [filters, setFilters] = useState({
    amenities: [],
    officeTypes: [],
  });

  useEffect(() => {
    fetchWorkspaces();
  }, [query, filters]);

  async function fetchWorkspaces() {
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

    if (error) {
      console.error('Error fetching workspaces:', error);
    } else {
      setWorkspaces(data);
    }
  }

  const handleFilterChange = (category, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [category]: prevFilters[category].includes(value)
        ? prevFilters[category].filter(item => item !== value)
        : [...prevFilters[category], value]
    }));
  };

  return (
    <div className="flex">
      <div className="w-1/4 pr-6">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <div className="space-y-4">
          <div>
            <Label className="text-lg">Amenities</Label>
            {['WiFi', 'Meeting Rooms', 'Parking', 'Coffee'].map(amenity => (
              <div key={amenity} className="flex items-center">
                <Checkbox
                  id={`amenity-${amenity}`}
                  checked={filters.amenities.includes(amenity)}
                  onCheckedChange={() => handleFilterChange('amenities', amenity)}
                />
                <label htmlFor={`amenity-${amenity}`} className="ml-2">{amenity}</label>
              </div>
            ))}
          </div>
          <div>
            <Label className="text-lg">Office Types</Label>
            {['Private Office', 'Open Space', 'Meeting Room', 'Virtual Office'].map(type => (
              <div key={type} className="flex items-center">
                <Checkbox
                  id={`type-${type}`}
                  checked={filters.officeTypes.includes(type)}
                  onCheckedChange={() => handleFilterChange('officeTypes', type)}
                />
                <label htmlFor={`type-${type}`} className="ml-2">{type}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-3/4">
        <h1 className="text-3xl font-bold mb-6">Search Results for "{query}"</h1>
        <WorkspaceList workspaces={workspaces} />
      </div>
    </div>
  );
}