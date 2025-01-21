export interface Community {
  id?: string
  srcImage: string
  name: string
  members: number
  transfers: number
  tokenSupply: string
  tokens?: string
  last_block?: number
}

export interface Communities {
  tokensInCirculation: string
  tokenTransfers: number
  members: number
  activeVendors: number
  communities: Community[]
}
