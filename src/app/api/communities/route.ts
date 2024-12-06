import { NextResponse } from 'next/server'
import axios from 'axios'
import { createAnonymousClient } from '@/utils/supabase/anonymousClient'

const etherScanApiKey = process.env.ETHERSCAN_API_KEY || ''
const COMMUNITIES = 'communities'


export async function PUT() {
    try {
        await updateCommunities();
    } catch (error) {
        return NextResponse.json(error, { status: 500 })
    }
}

export async function GET() {
    const supabaseClient = createAnonymousClient()

    const { data, error } = await supabaseClient.from(COMMUNITIES).select()
    if (error) return NextResponse.json(error, { status: 500 })

    return NextResponse.json(data)
}


async function updateCommunities() {

    const supabaseClient = createAnonymousClient()

    const { data, error } = await supabaseClient.from(COMMUNITIES).select()
    if (error) throw new Error(`Error gathering communities: ${error}`)

    data.forEach(async community => {

        const communityData = await gatherContractInfo(community.contract_address, community.last_block, community.topic)

        community.transfers = communityData.transfers
        community.members = communityData.members
        community.tokens = communityData.tokens
        community.last_block = communityData.last_block

        const updateResult = await supabaseClient
            .from(COMMUNITIES)
            .update(community)
            .eq('id', community.id)
            .select()
            .single()
        if (updateResult.error)
            throw new Error(`Error updating communities: ${error}`)
    });
    return true;
}

async function callApi(apiURL: string): Promise<any> {
    try {

        const response = await axios.get(apiURL)

        if (response.data.status !== '1') {
            throw new Error(`Remote API error fetching data: ${response.data.message}`)
        }
        return response.data.result;
    } catch (error) {
        console.error('Unexpected error fetching data:', error)
        throw error;
    }
}

async function gatherContractInfo(contractAddress: string, topic: string, fromBlock: number): Promise<Record<string, any>> {

    const getTokenSupplyApiUrl = `https://api.etherscan.io/api?chainid=1&module=stats&action=tokensupply&contractaddress=${contractAddress}&apikey=${etherScanApiKey}`
    const getHolderCountSupplyApiUrl = `https://api.etherscan.io/api?module=token&action=tokenholdercount&contractaddress=${contractAddress}&apikey=${etherScanApiKey}`
    const countTransferCallssApiUrl = `https://api.etherscan.io/api?module=logs&action=getLogs&fromBlock=${fromBlock}&toBlock=latest&address=${contractAddress}&topic0=${topic}&page=1&offset=1000&apikey=${etherScanApiKey}`


    const communityData: Record<string, any> = {}

    communityData['tokens'] = (await callApi(getTokenSupplyApiUrl)).result
    communityData['members'] = (await callApi(getHolderCountSupplyApiUrl)).result

    const transferCountResponse: any = await callApi(countTransferCallssApiUrl)
    communityData['transfers'] = transferCountResponse.result.length

    communityData['last_block'] = transferCountResponse.result.reduce((max: any, block: any) => {
        const currentBlockNumber = parseInt(block.blockNumber, 16); // Convertir a decimal
        const maxBlockNumber = parseInt(max.blockNumber, 16); // Convertir a decimal
        return currentBlockNumber > maxBlockNumber ? block : max;
    }, transferCountResponse.result[0])

    return communityData
}
