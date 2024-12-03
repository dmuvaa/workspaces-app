import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { MapPin, Star, Coffee, Wifi, Users, Clock } from 'lucide-react';

const workspaces = [
  {name: "TechHub", location: "San Francisco", image: "/images/techhub.jpg"},
  {name: "CreativeCorner", location: "New York", image: "/images/creativecorner.jpg"},
  {name: "InnovationLab", location: "London", image: "/images/innovationlab.jpg"},
  {name: "ZenOffice", location: "Tokyo", image: "/images/zenoffice.jpg"},
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center text-white">
        <Image
          src="/images/hero-image.jpg"
          alt="Coworking Space"
          fill
          style={{objectFit: "cover"}}
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold mb-4">Find Your Perfect Workspace</h1>
          <p className="text-xl mb-8">Discover coworking spaces that inspire creativity and productivity</p>
          <div className="flex justify-center">
            <Input className="w-64 mr-2" placeholder="Enter city or workspace name" />
            <Button>Search</Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filter */}
          <aside className="w-full md:w-1/4">
            <Card>
              <CardHeader>
                <CardTitle>Filter Workspaces</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Amenities</h3>
                    {['WiFi', 'Meeting Rooms', 'Coffee', '24/7 Access'].map((amenity) => (
                      <div key={amenity} className="flex items-center">
                        <Checkbox id={`amenity-${amenity}`} />
                        <Label htmlFor={`amenity-${amenity}`} className="ml-2">{amenity}</Label>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Office Type</h3>
                    {['Private Office', 'Open Space', 'Meeting Room', 'Virtual Office'].map((type) => (
                      <div key={type} className="flex items-center">
                        <Checkbox id={`type-${type}`} />
                        <Label htmlFor={`type-${type}`} className="ml-2">{type}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Featured Workspaces */}
          <section className="w-full md:w-3/4">
            <h2 className="text-3xl font-bold mb-6">Featured Workspaces</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {workspaces.map((workspace) => (
                <Card key={workspace.name}>
                  <Image src={workspace.image} alt={workspace.name} width={400} height={200} className="rounded-t-lg" />
                  <CardContent className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{workspace.name}</h3>
                    <p className="text-muted-foreground mb-4 flex items-center">
                      <MapPin className="w-4 h-4 mr-1" /> {workspace.location}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span>4.8 (120 reviews)</span>
                      </div>
                      <Button variant="outline">View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Popular Locations */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Popular Locations</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['New York', 'London', 'San Francisco', 'Tokyo', 'Berlin', 'Paris', 'Singapore', 'Sydney'].map((city) => (
              <Link href={`/${city.toLowerCase().replace(' ', '-')}`} key={city} className="text-center">
                <div className="bg-background rounded-lg p-4 hover:shadow-md transition-shadow">
                  <MapPin className="w-8 h-8 mx-auto mb-2" />
                  <h3 className="font-semibold">{city}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Global Workspaces?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {icon: Coffee, title: "Premium Amenities", description: "Enjoy high-speed WiFi, ergonomic furniture, and unlimited coffee to fuel your productivity."},
              {icon: Users, title: "Vibrant Community", description: "Connect with like-minded professionals and expand your network in our diverse coworking spaces."},
              {icon: Clock, title: "Flexible Plans", description: "Choose from a variety of membership options to suit your needs, from hot desks to private offices."},
            ].map((feature) => (
              <div key={feature.title} className="text-center">
                <feature.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to find your perfect workspace?</h2>
          <p className="text-xl mb-8">Join thousands of satisfied professionals who have found their ideal work environment through Global Workspaces.</p>
          <Button size="lg" variant="secondary">
            Get Started
          </Button>
        </div>
      </section>
    </div>
  );
}
