'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WorkspaceCard } from '@/components/WorkspaceCard';
import { UserProfileForm } from '@/components/UserProfileForm';
import { SubscriptionDetails } from '@/components/SubscriptionDetails';

type Workspace = {
  id: string;
  name: string;
  description: string;
  status: 'PENDING' | 'ACTIVE' | 'INACTIVE';
};

type User = {
  id: string;
  email: string;
  name: string;
};

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser({
          id: user.id,
          email: user.email!,
          name: user.user_metadata.name || '',
        });
        fetchWorkspaces(user.id);
      } else {
        router.push('/login');
      }
    };

    getUser();
  }, []);

  const fetchWorkspaces = async (userId: string) => {
    const response = await fetch(`/api/workspaces?userId=${userId}`);
    if (response.ok) {
      const data = await response.json();
      setWorkspaces(data);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={`https://avatar.vercel.sh/${user.email}`} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">Welcome, {user.name || user.email}!</h1>
            <p className="text-muted-foreground">Manage your workspaces and account</p>
          </div>
        </div>
        <Button onClick={handleSignOut}>Sign Out</Button>
      </div>

      <Tabs defaultValue="workspaces">
        <TabsList className="mb-4">
          <TabsTrigger value="workspaces">My Workspaces</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
        </TabsList>

        <TabsContent value="workspaces">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Create New Workspace</CardTitle>
                <CardDescription>Add a new workspace to your account</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/create-workspace">Create Workspace</Link>
                </Button>
              </CardFooter>
            </Card>
            {workspaces.map((workspace) => (
              <WorkspaceCard
                key={workspace.id}
                workspace={workspace}
                onEdit={() => router.push(`/workspaces/${workspace.id}/edit`)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>User Profile</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent>
              <UserProfileForm user={user} onUpdate={(updatedUser) => setUser(updatedUser)} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscription">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Details</CardTitle>
              <CardDescription>Manage your subscription and billing</CardDescription>
            </CardHeader>
            <CardContent>
              <SubscriptionDetails userId={user.id} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

