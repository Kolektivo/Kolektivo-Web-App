import { type VendorOpeningHour } from '@/types/vendors'

export const vendorsCategories = [{ label: 'Restaurant', value: 'Restaurant' }]

export const defaultOpeningHours: readonly VendorOpeningHour[] = [
  {
    day: 0,
    openingTime: '09:00',
    closingTime: '18:00',
    isClosed: false,
  },
  {
    day: 1,
    openingTime: '09:00',
    closingTime: '18:00',
    isClosed: false,
  },
  {
    day: 2,
    openingTime: '09:00',
    closingTime: '18:00',
    isClosed: false,
  },
  {
    day: 3,
    openingTime: '09:00',
    closingTime: '18:00',
    isClosed: false,
  },
  {
    day: 4,
    openingTime: '09:00',
    closingTime: '18:00',
    isClosed: false,
  },
  {
    day: 5,
    openingTime: '09:00',
    closingTime: '18:00',
    isClosed: false,
  },
  {
    day: 6,
    openingTime: '09:00',
    closingTime: '18:00',
    isClosed: false,
  },
]

export const wifiAvailability = [
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' },
]
