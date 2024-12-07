import {
  type AttendanceRequest,
  type AttendanceRequestResponse,
  type ActivityReviewType,
  type ActivityType,
} from '@/types/activities'
import { type User } from '@supabase/supabase-js'
import axios from 'axios'

class ActivitiesService {
  httpInstance = axios.create({
    baseURL: '/api',
  })

  public async get(user?: User, id?: string): Promise<(ActivityType & { organization: string })[] | undefined> {
    const response = await this.httpInstance.get<(ActivityType & { organization: string })[]>(
      `/activities${user || id ? '?' : ''}${user ? `hostId=${user.id}` : ''}${user ? '&' : ''}${id ? `id=${id}` : ''}`,
    )

    return response.data
  }

  public async getAttendanceRequests(activityId?: string): Promise<AttendanceRequest[]> {
    const response = await this.httpInstance.get<AttendanceRequestResponse[]>(
      `/activities/attendanceRequests?activity_id=${activityId}`,
    )

    return response.data.map<AttendanceRequest>((requestResponse) => ({
      id: requestResponse.id,
      activityId: requestResponse.activity_id,
      createdAt: requestResponse.created_at,
      user: requestResponse.user_name,
      checkIn: requestResponse.check_in,
      checkOut: requestResponse.check_out,
      address: requestResponse.wallet_address,
      Poc: requestResponse.notes,
      PocImage: requestResponse.proof_image,
      PocImagePath: requestResponse.proof_image_path,
      reportPath: requestResponse.report_path,
      state: requestResponse.state,
      payoutTransactionLink: requestResponse.transaction_link,
      denialReason: requestResponse.deny_reason,
    }))
  }

  public async setAttendanceRequest(
    attendanceRequests: AttendanceRequest[],
  ): Promise<AttendanceRequestResponse[] | undefined> {
    const response = await this.httpInstance.put<AttendanceRequestResponse[]>(
      `/activities/attendanceRequests`,
      attendanceRequests,
    )
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
    const exampleActivity: ActivityType = {
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
