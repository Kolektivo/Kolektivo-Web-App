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

    if (error) return NextResponse.json(error)


    let lastDate: any = null;
    const impactDto: ImpactDto[] = [];
    data?.forEach((activity) => {
        if (lastDate === activity.start_date) {
            impactDto.push({ text: activity.title, isPrincipal: false });
        } else {
            lastDate = activity.start_date;
            impactDto.push(
                { text: formatDateToReadable(activity.start_date), isPrincipal: true }, 
                { text: activity.title, isPrincipal: false } 
            );
        }
    });
    return NextResponse.json(impactDto)

}
function formatDateToReadable(dateString: Date) {
    const date = new Date(dateString);

    // Opciones para el formateo
    const options = { day: '2-digit', month: 'short', year: 'numeric' };

    // Convertir la fecha al formato deseado
    return date.toLocaleDateString('en-US', options).replace(',', '');
}

