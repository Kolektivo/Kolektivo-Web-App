import { ImpactDto, type ActivityReviewType, type ActivityType } from '@/types/activities'
import { type User } from '@supabase/supabase-js'
import axios from 'axios'

class ActivitiesService {
  httpInstance = axios.create({
    baseURL: '/api',
  })

  public async get(user?: User, id?: string): Promise<(ActivityType & { organization: string })[] | undefined> {
    console.log(user)
    const idParam = id ? `id=${id}` : ''
    const response = await this.httpInstance.get<(ActivityType & { organization: string })[]>(
      `/activities${id ? '?' : ''}${idParam}`,
    )

    return response.data
  }

  public async getBanners(data: ActivityType[]): Promise<ActivityType[]> {
    const response = await this.httpInstance.post<(ActivityType & { organization: string })[]>(
      `/activities/banners`,
      data,
    )
    return response.data
  }

  public async getCompleted(page: number): Promise<ImpactDto[] | undefined> {
    const response = await this.httpInstance.get<ImpactDto[]>(`/activities/completed?page=${page}`)
    return response.data
  }

  public async create(activityReview: ActivityReviewType, user: User): Promise<ActivityType | undefined> {
    const exampleActivity: ActivityType = {
      created_at: new Date().toISOString(),
      activity_host_id: user.id,
      user_created: user.email ?? '',
      title: activityReview.name,
      description: activityReview.description,
      start_date: activityReview.date,
      end_date: activityReview.date,
      time_lapse: `${activityReview.startTime} - ${activityReview.endTime}`,
      full_address: 'Eco Center, 123 Greenway Drive, Austin, TX, USA',
      badge_contract_address: '0x1234abcd5678ef90',
      requirements: activityReview.requirements.toString(),
      location: activityReview.location,
      points: `${activityReview.kolectivoPoints}`,
      stamp: activityReview.stamps,
      banner_src: activityReview.banner,
    }
    const response = await this.httpInstance.post<ActivityType>('/activities', exampleActivity)
    return response.data
  }

  public async update(activityReview: ActivityReviewType, user: User, id: string): Promise<ActivityType | undefined> {
    const activity: ActivityType = {
      id,
      created_at: new Date().toISOString(),
      activity_host_id: user.id,
      user_created: user.email ?? '',
      title: activityReview.name,
      description: activityReview.description,
      start_date: activityReview.date,
      end_date: activityReview.date,
      time_lapse: `${activityReview.startTime} - ${activityReview.endTime}`,
      full_address: 'Eco Center, 123 Greenway Drive, Austin, TX, USA',
      badge_contract_address: '0x1234abcd5678ef90',
      requirements: activityReview.requirements.toString(),
      location: activityReview.location,
      points: `${activityReview.kolectivoPoints}`,
      stamp: activityReview.stamps,
      state: activityReview.state,
      banner_src: activityReview.banner,
    }
    const response = await this.httpInstance.put<ActivityType>('/activities', activity)
    return response.data
  }
  public async updateCompletedActivity(
    activityReview: ActivityReviewType,
    user: User,
    id: string,
  ): Promise<ActivityType | undefined> {
    const activity: ActivityType = {
      id,
      created_at: new Date().toISOString(),
      activity_host_id: user.id,
      user_created: user.email ?? '',
      title: activityReview.name,
      description: activityReview.description,
      start_date: activityReview.date,
      end_date: activityReview.date,
      time_lapse: `${activityReview.startTime} - ${activityReview.endTime}`,
      full_address: 'Eco Center, 123 Greenway Drive, Austin, TX, USA',
      badge_contract_address: '0x1234abcd5678ef90',
      requirements: activityReview.requirements.toString(),
      location: activityReview.location,
      points: `${activityReview.kolectivoPoints}`,
      stamp: activityReview.stamps,
      state: activityReview.state,
      report_src: activityReview.report,
      banner_src: activityReview.banner,
    }
    const response = await this.httpInstance.put<ActivityType>('/activities/completed', activity)
    return response.data
  }
  public async delete(id: string) {
    const response = await this.httpInstance.delete<ActivityType>(`/activities`, { data: { id } })
    return response.data
  }
}

const activitiesService = new ActivitiesService()
export default activitiesService
