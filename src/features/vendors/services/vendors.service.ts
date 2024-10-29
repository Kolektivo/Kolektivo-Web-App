import { type Vendor } from '@/types/vendors'
import axios from 'axios'

class VendorsService {
  httpInstance = axios.create({
    baseURL: '/api',
  })

  public async get(): Promise<Vendor[] | undefined> {
    const response = await this.httpInstance.get<Vendor[]>('/vendors')
    if (response.data.length > 0) return response.data
    else return [] as Vendor[]
  }

  public async create(vendor: Vendor): Promise<Vendor> {
    const response = await this.httpInstance.post<Vendor>('/vendors', vendor)

    return response.data
  }

  public async update(vendor: Vendor): Promise<Vendor> {
    const response = await this.httpInstance.put<Vendor>('/vendors', vendor)

    return response.data
  }
}

const vendorsService = new VendorsService()

export default vendorsService
