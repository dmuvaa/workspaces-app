import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge';

type WorkspaceCardProps = {
  workspace: {
    id: string;
    name: string;
    description: string;
    location: string;
    image: string;
    rating: number;
    reviews: number;
    status: 'PENDING' | 'ACTIVE' | 'INACTIVE';
  };
  onEdit?: () => void;
}

export function WorkspaceCard({ workspace, onEdit }: WorkspaceCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          {workspace.name}
          {workspace.status && (
            <Badge variant={workspace.status === 'ACTIVE' ? 'default' : 'secondary'}>
              {workspace.status}
            </Badge>
          )}
        </CardTitle>
        <CardDescription>{workspace.description}</CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-muted-foreground mb-4 flex items-center text-sm">
          <MapPin className="w-4 h-4 mr-1" /> {workspace.location}
        </p>
        <div className="flex items-center">
          <Star className="w-4 h-4 text-yellow-400 mr-1" />
          <span className="text-sm">{workspace.rating.toFixed(1)} ({workspace.reviews} reviews)</span>
        </div>
      </CardContent>
      <CardFooter>
        {onEdit && (
          <Button onClick={onEdit} className="w-full">Edit Workspace</Button>
        )}
        {!onEdit && (
          <Button asChild className="w-full">
            <Link href={`/workspaces/${workspace.id}`}>View Details</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

