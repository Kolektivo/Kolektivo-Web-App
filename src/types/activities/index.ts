export type CreateActivityDetailFormValues = {
  name: string
  date: string
  startTime: string
  endTime: string
  location: string
  latitude: number
  longitude: number
  description: string
}

export type CreateActivityRequirementsRewardsFormValues = {
  requirements: string
  kolectivoPoints: number
  stamps: string
}

export type ActivityReviewType = CreateActivityDetailFormValues &
  CreateActivityRequirementsRewardsFormValues & { banner: string } & { report?: string } & {
    state: 'completed' | 'upcoming' | 'actionRequired'
  }

export type ActivityType = {
  id?: string
  created_at: string
  activity_host_id: string
  user_created: string
  title: string
  description: string
  start_date: string
  end_date: string
  full_address: string
  badge_contract_address: string
  requirements: string
  location: string | null
  latitude: number
  longitude: number
  points: string | null
  stamp: string | null
  time_lapse: string
  state?: 'completed' | 'upcoming' | 'actionRequired'
  banner_src?: string | null
  banner_path?: string | null
  report_src?: string | null
  report_path?: string | null
}

export type AttendanceRequestResponse = {
  id: string
  activity_id: string
  check_in: string
  check_out: string
  created_at: string
  deny_reason: string
  notes: string
  proof_image_path: string
  proof_image?: string
  state: 'denied' | 'forManagePayout' | 'completed' | ''
  transaction_link: string
  user_name: string
  wallet_address: string
}

export type AttendanceRequest = {
  id: string
  activityId: string
  user: string
  checkIn: string
  checkOut: string
  createdAt: string
  address: string
  Poc: string
  PocImage: string
  PocImagePath: string
  state: 'denied' | 'forManagePayout' | 'completed' | ''
  payoutTransactionLink: string
  denialReason: string
}

export type ImpactDto = {
  text: string
  isPrincipal: boolean

}

