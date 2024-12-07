import { type AttendanceRequest, type AttendanceRequestResponse } from '@/types/activities'
import axios from 'axios'

class AttendanceRequestsService {
  httpInstance = axios.create({
    baseURL: '/api',
  })
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
      PocImage: requestResponse.proof_image ?? '',
      PocImagePath: requestResponse.proof_image_path,
      state: requestResponse.state,
      payoutTransactionLink: requestResponse.transaction_link,
      denialReason: requestResponse.deny_reason,
    }))
  }

  public async setAttendanceRequest(attendanceRequests: AttendanceRequest[]) {
    const requests: AttendanceRequestResponse[] = attendanceRequests.map((attendanceRequest) => ({
      id: attendanceRequest.id,
      activity_id: attendanceRequest.activityId,
      check_in: attendanceRequest.checkIn,
      check_out: attendanceRequest.checkOut,
      created_at: attendanceRequest.createdAt,
      deny_reason: attendanceRequest.denialReason,
      notes: attendanceRequest.Poc,
      proof_image_path: attendanceRequest.PocImagePath,
      state: attendanceRequest.state,
      transactionLink: attendanceRequest.payoutTransactionLink,
      user_name: attendanceRequest.user,
      wallet_address: attendanceRequest.address,
      transaction_link: attendanceRequest.payoutTransactionLink,
    }))
    await this.httpInstance.put<AttendanceRequestResponse[]>(`/activities/attendanceRequests`, requests)
  }
}
const attendanceRequestsService = new AttendanceRequestsService()
export default attendanceRequestsService
