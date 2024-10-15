export type CreateActivityDetailFormValues = {
  name: string
  date: string
  startTime: string
  endTime: string
  location: string
  description: string
}

export type CreateActivityRequirementsRewardsFormValues = {
  requirements: string[]
  kolectivoPoints: number
  stamps: string
}

export type CreateActivityReviewType = {
  detail: CreateActivityDetailFormValues
  banner: string
  requirementsRewards: CreateActivityRequirementsRewardsFormValues
}

export type ActivityType = {
  id?: string
  created_at: string
  activity_host_id: string
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
  banner_src?: string | null
  banner_path?: string | null
}
