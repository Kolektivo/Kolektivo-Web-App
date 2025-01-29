import { type Vendor } from '@/types/vendors'
import axios from 'axios'

class VendorsService {
  httpInstance = axios.create({
    baseURL: '/api',
  })


  fetcher = (url: string) => axios.get<Vendor[]>(url).then(response => {
    if (response.data.length > 0) return response.data
    else return [] as Vendor[]
  })


  public async get(id: string): Promise<Vendor | undefined> {
    const response = await this.httpInstance.get<Vendor>(`/vendors/${id}`)
    if (response.data) return response.data
  }

  public async create(vendor: Vendor): Promise<Vendor> {
    const response = await this.httpInstance.post<Vendor>('/vendors', vendor)

    return response.data
  }

  public async update(vendor: Vendor): Promise<Vendor> {
    const response = await this.httpInstance.put<Vendor>(`/vendors/${vendor.id}`, vendor)

    return response.data
  }

  public async delete(id: string): Promise<Vendor> {
    const response = await this.httpInstance.delete(`/vendors/${id}`)

    return response.data
  }
}

const vendorsService = new VendorsService()

export default vendorsService
