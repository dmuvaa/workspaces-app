import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { prisma } from '@/lib/prisma';

const BUCKET_NAME = 'workspace-images'; // Replace with your actual bucket name

export async function POST(req: Request) {
  console.log('Received request to create workspace');

  try {
    const supabase = await createClient();

    const body = await req.json();
    console.log('Request body:', body);

    const {
      name,
      description,
      country,
      city,
      address,
      building,
      floorNumber,
      officeNumber,
      officeTypes,
      amenities,
      images, // Array of image objects { name, type, content }
      pricingPlans,
      website,
      email,
      status,
    } = body;

    // Get the current user
    const {
      data: { User },
    } = await supabase.auth.getUser();

    if (!User) {
      console.log('Unauthorized: No user found');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('Creating workspace for user:', User.id);

    // Process image uploads
    const uploadedImagePaths = [];

    for (const image of images) {
      const { name, type, content } = image;

      if (!name || !type || !content) {
        console.log('Skipping invalid image:', image);
        continue;
      }

      const binaryContent = Buffer.from(content, 'base64');
      const filePath = `${User.id}/${name}`; // User-specific folder

      const { error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, binaryContent, {
          contentType: type,
          upsert: true, // Overwrites the file if it already exists
        });

      if (uploadError) {
        console.log('Error uploading image:', uploadError.message);
        continue;
      }

      const { data: publicUrlData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(filePath);

      if (publicUrlData?.publicUrl) {
        uploadedImagePaths.push(publicUrlData.publicUrl);
      }
    }

    console.log('Uploaded images:', uploadedImagePaths);

    // Create the workspace in the database
    const workspace = await prisma.workspace.create({
      data: {
        name,
        description,
        officeTypes,
        images: uploadedImagePaths, // Store the public URLs
        pricing: pricingPlans,
        website,
        email,
        status,
        location: {
          create: {
            country,
            city,
            address,
            building,
            floorNumber,
            officeNumber,
          },
        },
        userId: User.id, // Associate workspace with the user
        amenities,
      },
    });

    console.log('Workspace created successfully:', workspace);

    return NextResponse.json(workspace);
  } catch (error) {
    console.error('Error creating workspace:', error);
    return NextResponse.json({ error: 'An error occurred while creating the workspace.' }, { status: 500 });
  }
}
