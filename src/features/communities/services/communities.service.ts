import { Communities } from '@/types/communities'
import axios from 'axios'

class CommunitiesService {
  httpInstance = axios.create({
    baseURL: '/api',
  })

  public async get(): Promise<Communities | undefined> {
    const response = await this.httpInstance.get<Communities>('/communities')
    if (response.data && response.data.communities.length > 0) return response.data
    else return {} as Communities
  }

}

const communitiesService = new CommunitiesService()

export default communitiesService
