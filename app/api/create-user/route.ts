import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { id, email, firstName, lastName } = await req.json();

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { id } });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 200 });
    }

    const user = await prisma.user.create({
      data: {
        id,
        email,
        firstName,
        lastName,
        password: '', // We don't store the actual password, as it's managed by Supabase Auth
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
  }
}

