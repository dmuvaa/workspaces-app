import Image from 'next/image'
import { Clock, Globe } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

type WorkspaceDetailsProps = {
  workspace: {
    id: string
    name: string
    description: string
    location: {
      address: string
      city: string
      country: string
    }
    amenities: string[]
    officeTypes: string[]
    pricing: {
      [key: string]: number
    }
    contacts: {
      email: string
      phone: string
    }
    images: string[]
    businessHours: {
      weekdays: string
      weekends: string
    }
    website: string
  }
}

export function WorkspaceDetails({ workspace }: WorkspaceDetailsProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">{workspace.name}</h1>
        <p className="text-muted-foreground">
          {`${workspace.location.address}, ${workspace.location.city}, ${workspace.location.country}`}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{workspace.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Amenities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {workspace.amenities.map((amenity) => (
                  <Badge key={amenity}>{amenity}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Office Types</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {workspace.officeTypes.map((type) => (
                  <Badge key={type} variant="outline">{type}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pricing</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {Object.entries(workspace.pricing).map(([period, price]) => (
                  <li key={period} className="flex justify-between">
                    <span className="capitalize">{period}</span>
                    <span>${price}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>Email: {workspace.contacts.email}</p>
              <p>Phone: {workspace.contacts.phone}</p>
              <p className="flex items-center">
                <Globe className="w-4 h-4 mr-2" />
                <a href={workspace.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {workspace.website}
                </a>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Business Hours</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Weekdays: {workspace.businessHours.weekdays}
              </p>
              <p className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Weekends: {workspace.businessHours.weekends}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Images</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {workspace.images.map((image, index) => (
            <div key={index} className="relative h-48">
              <Image 
                src={image || "/placeholder.svg"} 
                alt={`${workspace.name} - Image ${index + 1}`} 
                fill 
                style={{objectFit: "cover"}}
                className="rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <Button size="lg" onClick={() => window.location.href = `mailto:${workspace.contacts.email}`}>
          Contact Workspace
        </Button>
      </div>
    </div>
  )
}

