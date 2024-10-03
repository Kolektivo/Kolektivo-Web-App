export interface OrganizationInfo {
  name?: string
  location?: string
  website?: string
  email?: string
  description?: string
  commitment?: string
}

export interface OrganizationLogo {
  logoBase64?: string
}

export type Organization = OrganizationInfo & OrganizationLogo
