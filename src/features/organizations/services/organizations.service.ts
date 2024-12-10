import { type Organization } from '@/types/organization'
import axios from 'axios'

class OrginizationsService {
  httpInstance = axios.create({
    baseURL: '/api',
  })

  public async get(): Promise<Organization | undefined> {
    const response = await this.httpInstance.get<Organization[]>('/organizations')
    if (response.data.length > 0) return response.data.pop()
    else return {} as Organization
  }

  public async create(organization: Organization): Promise<Organization> {
    const response = await this.httpInstance.post<Organization>('/organizations', organization)

    return response.data
  }

  public async update(organization: Organization): Promise<Organization> {
    const response = await this.httpInstance.put<Organization>(`/organizations/${organization.id}`, organization)

    return response.data
  }
}

const organizationsService = new OrginizationsService()

export default organizationsService
