export interface OrganizationInfo {
  id?: string
  name?: string
  location?: string
  website?: string
  email?: string
  description?: string
  commitment?: string
  latitude?: number
  longitude?: number
}

export interface OrganizationLogo {
  logoSrc?: string
}

export type Organization = OrganizationInfo & OrganizationLogo
