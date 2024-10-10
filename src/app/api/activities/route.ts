import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { type ActivityType } from '@/types/activities'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

const ACTIVITIES = 'activities'

export async function GET() {
  const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  const { data, error } = await supabaseClient.from(ACTIVITIES).select('*')
  if (error) return NextResponse.json(error)
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  const newActivity = (await req.json()) as ActivityType
  const { data, error } = await supabaseClient.from(ACTIVITIES).insert([newActivity]).select()
  if (error) return NextResponse.json(error)
  return NextResponse.json(data)
}

export async function PUT(req: NextRequest) {
  const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  const { data, error } = await supabaseClient
    .from(ACTIVITIES)
    .upsert(await req.json())
    .select()
  if (error) return NextResponse.json(error)
  return NextResponse.json(data)
}
