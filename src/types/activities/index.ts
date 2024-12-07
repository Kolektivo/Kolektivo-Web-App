export type CreateActivityDetailFormValues = {
  name: string
  date: string
  startTime: string
  endTime: string
  location: string
  description: string
}

export type CreateActivityRequirementsRewardsFormValues = {
  requirements: string
  kolectivoPoints: number
  stamps: string
}

export type ActivityReviewType = CreateActivityDetailFormValues &
  CreateActivityRequirementsRewardsFormValues & { banner: string }

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
  points: string | null
  stamp: string | null
  time_lapse: string
  banner_src?: string | null
  banner_path?: string | null
}

export type AttendanceRequestResponse = {
  id: string
  activity_id: string
  check_in: string
  check_out: string
  created_at: string
  denyReason: string
  notes: string
  picturePath: string
  state: 'denied' | 'forManagePayout' | 'completed'
  transactionLink: string
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
  state: 'denied' | 'forManagePayout' | 'completed' | ''
  payoutTransactionLink: string
  denialReason: string
}
