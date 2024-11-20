'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';

interface Workspace {
  id: number;
  name: string;
  location: string;
  officeTypes: string[];
}

type WorkspaceListProps = {
  city: string;
};

export default function WorkspaceList({ city }: WorkspaceListProps): JSX.Element {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);

  const fetchWorkspaces = useCallback(async () => {
    const { data, error } = await supabase
      .from('workspaces')
      .select('*')
      .limit(10);

    if (error) {
      console.error('Error fetching workspaces:', error);
      setWorkspaces([]);
    } else if (data) {
      setWorkspaces(data as Workspace[]); // Type assertion added to align with the expected shape
    }
  }, []);

  useEffect(() => {
    fetchWorkspaces();
  }, [fetchWorkspaces]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {workspaces.map((workspace) => (
        <Card key={workspace.id}>
          <CardHeader>
            <CardTitle>{workspace.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">{workspace.location}</p>
            {workspace.officeTypes?.length > 0 && (
              <Badge>{workspace.officeTypes[0]}</Badge>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
