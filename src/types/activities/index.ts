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

export type CreateActivityReview = {
  detail: CreateActivityDetailFormValues
  banner: string
  requirementsRewards: CreateActivityRequirementsRewardsFormValues
}

export type Activity = CreateActivityDetailFormValues & CreateActivityRequirementsRewardsFormValues & { banner: string }
