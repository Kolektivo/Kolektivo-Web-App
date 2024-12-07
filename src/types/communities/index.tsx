export interface Community {
  id?: string
  srcImage: string
  name: string
  members: number
  tokenSupply: number
}


export interface Communities {
  tokensInCirculation: number
  tokenTransfers: number
  members: number
  activeVendors: number
  communities: Community[]
}


