import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Set the runtime directly
export const runtime = 'experimental-edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');

  let query = supabase.from('workspaces').select('*');

  if (city) {
    query = query.ilike('location', `%${city}%`);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
