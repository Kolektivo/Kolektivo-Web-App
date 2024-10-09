import { type ActivityType } from '@/types/activities'
import axios from 'axios'

class ActivitiesService {
  httpInstance = axios.create({
    baseURL: '/api',
  })
  public async get(): Promise<ActivityType[] | undefined> {
    const response = await this.httpInstance.get<ActivityType[]>('/activities')

    return response.data
  }
}

const activitiesService = new ActivitiesService()
export default activitiesService
