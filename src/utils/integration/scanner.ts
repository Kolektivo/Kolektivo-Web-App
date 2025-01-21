
import axios from 'axios'
import { formatUnits, toInteger } from '../formatters/numeric'

const scannerApi = process.env.SCANNER_API_URL || ''
export async function callApi(apiURL: string, params: any): Promise<any> {
  try {
    console.log('Calling ', apiURL, params)
    const response = await axios.get(apiURL, params)

    if (response.data.status !== '1') {
      throw new Error('Remote API error fetching data: ' + response.data.message + ' ' + response.data.result)
    }
    return response.data.result
  } catch (error) {
    console.error('Unexpected error fetching data:', error)
    throw error
  }
}

export async function gatherScannerInfo(contractAddress: string, fromBlock: number): Promise<Record<string, any>> {
  console.log('Conllecting contract info')
  const getTokenSupplyParams = {
    module: 'token',
    action: 'getToken',
    contractaddress: contractAddress,
  }
  const getHolderCountSupplyParams = {
    module: 'token',
    action: 'getTokenHolders',
    contractaddress: contractAddress,
  }
  const countTransferCallssApiUrl = {
    module: 'token',
    action: 'tokentx',
    fromBlock: fromBlock,
    toBlock: 'latest',
    contractaddress: contractAddress,
  }

  const communityData: Record<string, any> = {}

  const tokenSuppply = await callApi(scannerApi, { params: getTokenSupplyParams })
  console.log('Got tokens: ', tokenSuppply)
  communityData['tokens'] = formatUnits(tokenSuppply.totalSupply, tokenSuppply.decimals)
  console.log('Set tokens: ' + communityData['tokens'])
  const members = await callApi(scannerApi, { params: getHolderCountSupplyParams })
  communityData['members'] = members.length
  console.log('Got members: ' + communityData['members'])

  const transferCalls: any = await callApi(scannerApi, { params: countTransferCallssApiUrl })
  communityData['transfers'] = transferCalls.length
  console.log('Got transfers: ' + communityData['transfers'])

  const lastBlockHex = transferCalls.reduce((max: any, block: any) => {
    const currentBlockNumber = toInteger(block.blockNumber)
    const maxBlockNumber = toInteger(max.blockNumber)
    return currentBlockNumber > maxBlockNumber ? block : max
  }, transferCalls[0])

  communityData['last_block'] = toInteger(lastBlockHex.blockNumber)

  console.log('Got last block: ', communityData['last_block'])
  return communityData
}

