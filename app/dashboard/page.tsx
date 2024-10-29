'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

// Mock data for workspaces
const mockWorkspaces = [
  { id: 1, name: 'TechHub', location: 'San Francisco' },
  { id: 2, name: 'CreativeCorner', location: 'New York' },
  { id: 3, name: 'InnovationLab', location: 'London' },
];

export default function Dashboard() {
  const [workspaces, setWorkspaces] = useState([]);

  useEffect(() => {
    // Simulating an API call with setTimeout
    setTimeout(() => {
      setWorkspaces(mockWorkspaces);
    }, 1000);
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Your Workspaces</h2>
        <Link href="/dashboard/new-workspace">
          <Button>Add New Workspace</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workspaces.map((workspace) => (
          <Card key={workspace.id}>
            <CardHeader>
              <CardTitle>{workspace.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">{workspace.location}</p>
              <Link href={`/dashboard/workspace/${workspace.id}`}>
                <Button variant="outline">Manage</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}