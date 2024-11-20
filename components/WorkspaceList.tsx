'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';

interface Workspace {
  id: number;
  name: string;
  location?: string; // Made optional to handle missing data
  officeTypes: string[];// Made optional to handle missing data
}

type WorkspaceListProps = {
  city: string; // Filter workspaces based on this prop
};

export default function WorkspaceList({ city }: WorkspaceListProps): JSX.Element {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkspaces = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('workspaces')
        .select('*')
        .ilike('location', `%${city}%`) // Filter by city dynamically
        .limit(10);

      if (error) throw error;

      setWorkspaces(data || []);
    } catch (err) {
      console.error('Error fetching workspaces:', err);
      setError('Failed to load workspaces. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [city]);

  useEffect(() => {
    fetchWorkspaces();
  }, [fetchWorkspaces]);

  if (loading) {
    return <p>Loading workspaces...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (workspaces.length === 0) {
    return <p>No workspaces available in {city}.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {workspaces.map((workspace) => (
        <Card key={workspace.id}>
          <CardHeader>
            <CardTitle>{workspace.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">
              {workspace.location || 'No location specified'}
            </p>
            {workspace.officeTypes.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {workspace.officeTypes.map((type, index) => (
                  <Badge key={index}>{type}</Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
