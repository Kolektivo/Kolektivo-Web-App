import { Communities } from '@/types/communities'
import axios from 'axios'

class CommunitiesService {

  fetcher = (url: string) => axios.get<Communities>(url).then(res => {
    if (res.data && res.data.communities.length > 0)
      return res.data
    else
      return {} as Communities
  })


}

const communitiesService = new CommunitiesService()

export default communitiesService
