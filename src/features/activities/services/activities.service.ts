import { type CreateActivityReviewType, type ActivityType } from '@/types/activities'
import axios from 'axios'

class ActivitiesService {
  httpInstance = axios.create({
    baseURL: '/api',
  })
  public async get(): Promise<ActivityType[] | undefined> {
    const response = await this.httpInstance.get<ActivityType[]>('/activities')

    return response.data
  }

  public async post(activityReview: CreateActivityReviewType): Promise<string | undefined> {
    console.log(activityReview)
    // const response = await this.httpInstance.post<string>('/activities')
    // return response.data
    return ''
  }
}

const activitiesService = new ActivitiesService()
export default activitiesService
