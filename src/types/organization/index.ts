export interface OrganizationInfo {
  name?: string
  location?: string
  website?: string
  email?: string
  description?: string
  commitment?: string
}

export interface OrganizationLogo {
  logoSrc?: string
}

export type Organization = OrganizationInfo & OrganizationLogo
