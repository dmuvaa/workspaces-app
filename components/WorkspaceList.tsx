'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';

export default function WorkspaceList() {
  const [workspaces, setWorkspaces] = useState([]);

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  async function fetchWorkspaces() {
    const { data, error } = await supabase
      .from('workspaces')
      .select('*')
      .limit(10);

    if (error) {
      console.error('Error fetching workspaces:', error);
    } else {
      setWorkspaces(data);
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {workspaces.map((workspace) => (
        <Card key={workspace.id}>
          <CardHeader>
            <CardTitle>{workspace.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">{workspace.location}</p>
            <Badge>{workspace.officeTypes[0]}</Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}