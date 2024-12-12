import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { type ActivityType } from '@/types/activities'
import { getActivities, postActivity, putActivity } from '@/services/domain/activities.service'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseBucket = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const bannerBasePath = process.env.NEXT_PUBLIC_ACTIVITIES_BANNER_PATH || ''

const ACTIVITIES = 'activities'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  const hostId = searchParams.get('hostId')
  return getActivities(hostId as string, id as string)
}

export async function POST(req: NextRequest) {
  const newActivity = (await req.json()) as ActivityType
  return postActivity(newActivity)
}

export async function PUT(req: NextRequest) {
  const updatedActivity = (await req.json()) as ActivityType
  return putActivity(updatedActivity)
}

export async function DELETE(req: NextRequest) {
  const id = await req.json().then((body) => body.id)
  const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  const { data, error } = await supabaseClient.from(ACTIVITIES).delete().eq('id', id)
  if (error) return NextResponse.json(error)
  return NextResponse.json(data)
}

