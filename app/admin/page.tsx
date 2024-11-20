'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface User {
  id: number;
  email: string;
  created_at: string;
}

interface Workspace {
  id: number;
  name: string;
  location: string;
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState({ users: true, workspaces: true });

  useEffect(() => {
    fetchUsers();
    fetchWorkspaces();
  }, []);

  async function fetchUsers() {
    try {
      const { data, error } = await supabase.from('users').select('*');
      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      alert('Failed to fetch users. Please try again later.');
    } finally {
      setLoading((prev) => ({ ...prev, users: false }));
    }
  }

  async function fetchWorkspaces() {
    try {
      const { data, error } = await supabase.from('workspaces').select('*');
      if (error) throw error;
      setWorkspaces(data || []);
    } catch (error) {
      console.error('Error fetching workspaces:', error);
      alert('Failed to fetch workspaces. Please try again later.');
    } finally {
      setLoading((prev) => ({ ...prev, workspaces: false }));
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div>
        <h2 className="text-2xl font-semibold mb-3">Users</h2>
        {loading.users ? (
          <p>Loading users...</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.created_at
                      ? new Date(user.created_at).toLocaleString()
                      : 'N/A'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-3">Workspaces</h2>
        {loading.workspaces ? (
          <p>Loading workspaces...</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {workspaces.map((workspace) => (
                <TableRow key={workspace.id}>
                  <TableCell>{workspace.id}</TableCell>
                  <TableCell>{workspace.name}</TableCell>
                  <TableCell>{workspace.location}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => alert(`Edit workspace ${workspace.id}`)}>
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="ml-2"
                      onClick={() => alert(`Delete workspace ${workspace.id}`)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
