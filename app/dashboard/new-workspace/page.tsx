// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { supabase } from '@/lib/supabase';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Label } from '@/components/ui/label';

// export default function NewWorkspace() {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     location: '',
//     amenities: '',
//     officeTypes: '',
//     pricing: '',
//     contacts: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { data: { user } } = await supabase.auth.getUser();

//     if (!user) {
//       console.error('User not authenticated');
//       return;
//     }

//     const { data, error } = await supabase
//       .from('workspaces')
//       .insert({
//         ...formData,
//         userId: user.id,
//         amenities: formData.amenities.split(',').map(item => item.trim()),
//         officeTypes: formData.officeTypes.split(',').map(item => item.trim()),
//         pricing: JSON.parse(formData.pricing),
//         contacts: JSON.parse(formData.contacts),
//       });

//     if (error) {
//       console.error('Error creating workspace:', error);
//     } else {
//       router.push('/dashboard');
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6">Add New Workspace</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <Label htmlFor="name">Name</Label>
//           <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
//         </div>
//         <div>
//           <Label htmlFor="description">Description</Label>
//           <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
//         </div>
//         <div>
//           <Label htmlFor="location">Location</Label>
//           <Input id="location" name="location" value={formData.location} onChange={handleChange} required />
//         </div>
//         <div>
//           <Label htmlFor="amenities">Amenities (comma-separated)</Label>
//           <Input id="amenities" name="amenities" value={formData.amenities} onChange={handleChange} required />
//         </div>
//         <div>
//           <Label htmlFor="officeTypes">Office Types (comma-separated)</Label>
//           <Input id="officeTypes" name="officeTypes" value={formData.officeTypes} onChange={handleChange} required />
//         </div>
//         <div>
//           <Label htmlFor="pricing">Pricing (JSON format)</Label>
//           <Textarea id="pricing" name="pricing" value={formData.pricing} onChange={handleChange} required />
//         </div>
//         <div>
//           <Label htmlFor="contacts">Contacts (JSON format)</Label>
//           <Textarea id="contacts" name="contacts" value={formData.contacts} onChange={handleChange} required />
//         </div>
//         <Button type="submit">Create Workspace</Button>
//       </form>
//     </div>
//   );
// }

// app/dashboard/new-workspace/page.tsx

import CreateWorkspaceForm from '@/components/CreateWorkspaceForm';

export default function NewWorkspacePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Workspace</h1>
      <CreateWorkspaceForm />
    </div>
  );
}