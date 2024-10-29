import { type ActivityReviewType, type ActivityType } from '@/types/activities'
import axios from 'axios'

class ActivitiesService {
  httpInstance = axios.create({
    baseURL: '/api',
  })

  public async get(hostId: string, id?: string): Promise<ActivityType[] | undefined> {
    const response = await this.httpInstance.get<ActivityType[]>(
      `/activities${hostId || id ? '?' : ''}${hostId ? `hostId=${hostId}` : ''}${hostId ? '&' : ''}${id ? `id=${id}` : ''}`,
    )

    return response.data
  }

  public async create(activityReview: ActivityReviewType, hostId: string): Promise<ActivityType | undefined> {
    const exampleActivity: ActivityType = {
      created_at: new Date().toISOString(),
      activity_host_id: hostId,
      title: activityReview.name,
      description: activityReview.description,
      start_date: activityReview.date,
      end_date: '2024-11-02T15:00:00+00:00',
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

  public async update(
    activityReview: ActivityReviewType,
    hostId: string,
    id: string,
  ): Promise<ActivityType | undefined> {
    const exampleActivity: ActivityType = {
      id,
      created_at: '2024-09-15T14:45:00+00:00',
      activity_host_id: hostId,
      title: activityReview.name,
      description: activityReview.description,
      start_date: activityReview.date,
      end_date: '2024-11-02T15:00:00+00:00',
      full_address: 'Eco Center, 123 Greenway Drive, Austin, TX, USA',
      badge_contract_address: '0x1234abcd5678ef90',
      requirements: activityReview.requirements.toString(),
      location: activityReview.location,
      points: `${activityReview.kolectivoPoints}`,
      stamp: activityReview.stamps,
      banner_src: activityReview.banner,
    }
    const response = await this.httpInstance.put<ActivityType>('/activities', exampleActivity)
    return response.data
  }
  public async delete(id: string) {
    const response = await this.httpInstance.delete<ActivityType>(`/activities`, { data: { id } })
    return response.data
  }
}

const activitiesService = new ActivitiesService()
export default activitiesService
