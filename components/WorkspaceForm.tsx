'use client'

import { useState } from 'react'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { createClient } from '@/utils/supabase/client'

type WorkspaceFormData = {
  name: string
  description: string
  country: string
  city: string
  address: string
  building: string
  floorNumber: string
  officeNumber: string
  officeTypes: string[]
  amenities: string[]
  images: FileList
  pricingPlans: {
    type: 'hourly' | 'daily' | 'monthly'
    price: number
    currency: string
    onRequest: boolean
  }[]
  website: string
  email: string
  status: 'PENDING' | 'ACTIVE' | 'INACTIVE'
}

const amenitiesList = [
  'WiFi',
  'Meeting Rooms',
  'Coffee',
  '24/7 Access',
  'Printing',
  'Parking',
  'Kitchen',
  'Lockers',
]

const officeTypesList = [
  'Private Office',
  'Open Space',
  'Dedicated Desk',
  'Meeting Room',
  'Virtual Office',
]

export function WorkspaceForm() {
  const [activeTab, setActiveTab] = useState('basic-info')
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const { register, control, handleSubmit, watch, formState: { errors } } = useForm<WorkspaceFormData>({
    defaultValues: {
      pricingPlans: [{ type: 'hourly', price: 0, currency: 'USD', onRequest: false }]
    }
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: "pricingPlans"
  })
  const router = useRouter()

  const onSubmit = async (data: WorkspaceFormData) => {
    console.log('Form submitted with data:', data)
    try {
      const supabase = createClient()

      // Upload images to Supabase Storage
      const imageUrls = await Promise.all(
        Array.from(data.images).map(async (file) => {
          const { data: uploadData, error } = await supabase.storage
            .from('workspace-images')
            .upload(`${Date.now()}-${file.name}`, file)
          
          if (error) {
            console.error('Error uploading image:', error)
            throw error
          }
          
          const { data: { publicUrl } } = supabase.storage
            .from('workspace-images')
            .getPublicUrl(uploadData.path)
          
          return publicUrl
        })
      )

      // Prepare workspace data
      const workspaceData = {
        ...data,
        images: imageUrls,
      }

      console.log('Sending data to API:', workspaceData)

      // Send data to API route
      const response = await fetch('/api/create-workspace', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(workspaceData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Error response from API:', errorData)
        throw new Error('Failed to create workspace')
      }

      const result = await response.json()
      console.log('Workspace created successfully:', result)
      router.push(`/workspaces/${result.id}`)
    } catch (error) {
      console.error('Error creating workspace:', error)
      // Handle error (e.g., show error message to user)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      setSelectedImages(Array.from(files).map(file => file.name))
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
          <TabsTrigger value="amenities">Amenities & Types</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
        </TabsList>

        <TabsContent value="basic-info">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Workspace Name</Label>
                <Input id="name" {...register('name', { required: true })} />
                {errors.name && <span className="text-red-500">This field is required</span>}
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  {...register('description', { required: true, minLength: 100 })}
                />
                {errors.description && <span className="text-red-500">Please provide a description (at least 100 characters)</span>}
              </div>
              <div>
                <Label htmlFor="website">Website</Label>
                <Input id="website" {...register('website', { required: true })} />
                {errors.website && <span className="text-red-500">This field is required</span>}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...register('email', { required: true })} />
                {errors.email && <span className="text-red-500">This field is required</span>}
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Controller
                  name="status"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="ACTIVE">Active</SelectItem>
                        <SelectItem value="INACTIVE">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.status && <span className="text-red-500">This field is required</span>}
              </div>
            </CardContent>
            <CardFooter>
              <Button type="button" onClick={() => setActiveTab('location')}>Next</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="location">
          <Card>
            <CardHeader>
              <CardTitle>Location Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="country">Country</Label>
                <Input id="country" {...register('country', { required: true })} />
                {errors.country && <span className="text-red-500">This field is required</span>}
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" {...register('city', { required: true })} />
                {errors.city && <span className="text-red-500">This field is required</span>}
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" {...register('address', { required: true })} />
                {errors.address && <span className="text-red-500">This field is required</span>}
              </div>
              <div>
                <Label htmlFor="building">Building</Label>
                <Input id="building" {...register('building')} />
              </div>
              <div>
                <Label htmlFor="floorNumber">Floor Number</Label>
                <Input id="floorNumber" {...register('floorNumber')} />
              </div>
              <div>
                <Label htmlFor="officeNumber">Office Number</Label>
                <Input id="officeNumber" {...register('officeNumber')} />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" onClick={() => setActiveTab('basic-info')}>Previous</Button>
              <Button type="button" onClick={() => setActiveTab('amenities')}>Next</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="amenities">
          <Card>
            <CardHeader>
              <CardTitle>Amenities & Office Types</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Amenities</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {amenitiesList.map((amenity) => (
                      <div key={amenity} className="flex items-center space-x-2">
                        <Checkbox 
                          id={amenity} 
                          {...register('amenities')} 
                          value={amenity} 
                        />
                        <Label htmlFor={amenity}>{amenity}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Office Types</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {officeTypesList.map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox 
                          id={type} 
                          {...register('officeTypes')} 
                          value={type} 
                        />
                        <Label htmlFor={type}>{type}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" onClick={() => setActiveTab('location')}>Previous</Button>
              <Button type="button" onClick={() => setActiveTab('images')}>Next</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="images">
          <Card>
            <CardHeader>
              <CardTitle>Images</CardTitle>
            </CardHeader>
            <CardContent>
              <Input 
                type="file" 
                accept="image/*" 
                multiple 
                {...register('images', { required: true, validate: (value) => value.length <= 9 })}
                onChange={handleImageChange}
              />
              {errors.images && <span className="text-red-500">Please upload 1-9 images</span>}
              {selectedImages.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold">Selected Images:</h4>
                  <ul className="list-disc pl-5">
                    {selectedImages.map((imageName, index) => (
                      <li key={index}>{imageName}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" onClick={() => setActiveTab('amenities')}>Previous</Button>
              <Button type="button" onClick={() => setActiveTab('pricing')}>Next</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="pricing">
          <Card>
            <CardHeader>
              <CardTitle>Pricing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {fields.map((field, index) => (
                  <div key={field.id} className="space-y-2">
                    <div className="flex space-x-2">
                      <Controller
                        name={`pricingPlans.${index}.type`}
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select pricing type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="hourly">Hourly</SelectItem>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      <Controller
                        name={`pricingPlans.${index}.price`}
                        control={control}
                        rules={{ required: true, min: 0 }}
                        render={({ field }) => (
                          <Input
                            type="number"
                            placeholder="Price"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          />
                        )}
                      />
                      <Input 
                        {...register(`pricingPlans.${index}.currency` as const, { required: true })} 
                        placeholder="Currency"
                      />
                      <Button type="button" onClick={() => remove(index)}>Remove</Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`pricingPlans.${index}.onRequest`}
                        {...register(`pricingPlans.${index}.onRequest` as const)}
                      />
                      <Label htmlFor={`pricingPlans.${index}.onRequest`}>Price on Request</Label>
                    </div>
                  </div>
                ))}
                <Button type="button" onClick={() => append({ type: 'hourly', price: 0, currency: 'USD', onRequest: false })}>
                  Add Pricing Plan
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" onClick={() => setActiveTab('images')}>Previous</Button>
              <Button type="submit">Submit</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </form>
  )
}
