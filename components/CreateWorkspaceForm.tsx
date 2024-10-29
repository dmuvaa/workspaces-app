// components/CreateWorkspaceForm.tsx

"use client";

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '../hooks/use-toast';

type WorkspaceFormData = {
  name: string;
  description: string;
  location: string;
  amenities: string[];
  officeTypes: string[];
  pricing: {
    daily?: number;
    weekly?: number;
    monthly?: number;
  };
  images: FileList;
};

const amenitiesList = [
  'High-speed WiFi',
  'Meeting Rooms',
  'Coffee Machine',
  'Printing Services',
  'Bike Storage',
  'Shower Facilities',
  'Kitchen',
  '24/7 Access',
];

const officeTypesList = [
  'Private Office',
  'Open Space',
  'Dedicated Desk',
  'Meeting Room',
  'Virtual Office',
];

export default function CreateWorkspaceForm() {
  const router = useRouter();
  const { register, handleSubmit, control, formState: { errors } } = useForm<WorkspaceFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: WorkspaceFormData) => {
    setIsSubmitting(true);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to create a workspace.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Upload images
    const imageUrls = await Promise.all(
      Array.from(data.images).map(async (image) => {
        const fileName = `${user.id}/${Date.now()}-${image.name}`;
        const { data: uploadData, error } = await supabase.storage
          .from('workspace-images')
          .upload(fileName, image);

        if (error) {
          console.error('Error uploading image:', error);
          return null;
        }

        return supabase.storage.from('workspace-images').getPublicUrl(fileName).data.publicUrl;
      })
    );

    // Filter out any null values (failed uploads)
    const validImageUrls = imageUrls.filter((url): url is string => url !== null);

    const workspaceData = {
      ...data,
      userId: user.id,
      images: validImageUrls,
      pricing: JSON.stringify(data.pricing),
    };

    const { data: newWorkspace, error } = await supabase
      .from('workspaces')
      .insert(workspaceData);

    setIsSubmitting(false);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to create workspace. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Workspace created successfully!",
      });
      router.push('/dashboard');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Workspace</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Workspace Name</Label>
            <Input id="name" {...register('name', { required: 'Name is required' })} />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...register('description', { required: 'Description is required' })} />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input id="location" {...register('location', { required: 'Location is required' })} />
            {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
          </div>

          <div>
            <Label>Amenities</Label>
            <div className="grid grid-cols-2 gap-2">
              {amenitiesList.map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox id={`amenity-${amenity}`} {...register('amenities')} value={amenity} />
                  <label htmlFor={`amenity-${amenity}`}>{amenity}</label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label>Office Types</Label>
            <div className="grid grid-cols-2 gap-2">
              {officeTypesList.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox id={`officeType-${type}`} {...register('officeTypes')} value={type} />
                  <label htmlFor={`officeType-${type}`}>{type}</label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label>Pricing</Label>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="pricing.daily">Daily Rate</Label>
                <Input
                  id="pricing.daily"
                  type="number"
                  {...register('pricing.daily', { valueAsNumber: true })}
                />
              </div>
              <div>
                <Label htmlFor="pricing.weekly">Weekly Rate</Label>
                <Input
                  id="pricing.weekly"
                  type="number"
                  {...register('pricing.weekly', { valueAsNumber: true })}
                />
              </div>
              <div>
                <Label htmlFor="pricing.monthly">Monthly Rate</Label>
                <Input
                  id="pricing.monthly"
                  type="number"
                  {...register('pricing.monthly', { valueAsNumber: true })}
                />
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="images">Images</Label>
            <Input
              id="images"
              type="file"
              multiple
              accept="image/*"
              {...register('images', { required: 'At least one image is required' })}
            />
            {errors.images && <p className="text-red-500 text-sm">{errors.images.message}</p>}
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Workspace'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}