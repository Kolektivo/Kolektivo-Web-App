import * as z from 'zod'

export const detailFormShema = z.object({
  name: z.string().min(3),
  date: z.string().date(),
  startTime: z.string().min(4),
  endTime: z.string().min(4),
  location: z.string().min(3),
  description: z.string().min(12),
})

export const requiremetsRewardsFormSchema = z.object({
  requirements: z.string().array().nonempty(),
  kolectivoPoints: z.string(),
  stamp: z.string().min(2),
})
