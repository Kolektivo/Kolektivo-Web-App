import { createClient } from '@supabase/supabase-js'
import { type NextRequest, NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
// const supabaseBucket = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
// const bannerBasePath = process.env.NEXT_PUBLIC_ACTIVITIES_BANNER_PATH || ''
const ATTENDANCEREQUESTS = 'attendance_requests'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const activityId = searchParams.get('activity_id')
  const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  const { data, error } = await supabaseClient.from(ATTENDANCEREQUESTS).select('*').eq('activity_id', activityId)
  if (error) return NextResponse.json(error)
  return NextResponse.json(data)
}
