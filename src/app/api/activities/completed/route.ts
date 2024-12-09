import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { createAnonymousClient } from '@/utils/supabase/anonymousClient'


const ACTIVITIES = 'activities'

export async function GET(req: NextRequest) {

    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') ?? '1')
    const pageSize = 10;
    const supabaseClient = createAnonymousClient()

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error } = await supabaseClient
        .from(ACTIVITIES)
        .select('start_date,title')
        .eq('state', 'completed')
        .range(from, to)
        .order('start_date', { ascending: false })

    let lastDate: any = null;
    if (error) return NextResponse.json(error)
    const impactDto = data?.map((activity) => {
        if (lastDate == activity.start_date)
            return { text: activity.title, isPrincipal: false }
        else {
            lastDate = activity.start_date
            return { text: activity.start_date, isPrincipal: true }
        }
    })
    return NextResponse.json(impactDto)

}

