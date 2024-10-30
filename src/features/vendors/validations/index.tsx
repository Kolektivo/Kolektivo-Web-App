import { regexHour } from '@/utils/constants/regex'
import * as z from 'zod'

export const vendorInfoSchema = z.object({
  name: z.string().min(1),
  location: z.string().min(1),
  website: z.union([z.string().url(), z.string().length(0)]),
  phone: z.string().min(5),
  category: z.string().min(2),
  wifiAvailability: z.string().min(2),
  openingHours: z.array(
    z.object({
      day: z.number(),
      openingTime: z.string().regex(regexHour),
      closingTime: z.string().regex(regexHour),
      isClosed: z.boolean(),
    }),
  ),
})
