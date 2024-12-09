import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { createAnonymousClient } from '@/utils/supabase/anonymousClient'
import { ImpactDto } from '@/types/activities'


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
    const impactDto: ImpactDto[] = [];
    data?.forEach((activity) => {
        if (lastDate === activity.start_date) {
            impactDto.push({ text: activity.title, isPrincipal: false });
        } else {
            lastDate = activity.start_date;
            impactDto.push(
                { text: activity.start_date, isPrincipal: true }, // Primer elemento
                { text: activity.title, isPrincipal: false }      // Segundo elemento
            );
        }
    });
    return NextResponse.json(impactDto)

}

