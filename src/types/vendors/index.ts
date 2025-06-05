export interface VendorOpeningHour {
  day: number
  openingTime: string
  closingTime: string
  isClosed: boolean
}

export interface VendorInfo {
  id?: string
  name?: string
  location?: string
  website?: string
  phone?: string
  category?: string
  openingHours?: VendorOpeningHour[]
  wifiAvailability?: boolean
  latitude?: number
  longitude?: number
}

export interface VendorLogo {
  logoSrc?: string
}

export type Vendor = VendorInfo & VendorLogo
