import { NextResponse } from 'next/server'
import axios from 'axios'
import { createAnonymousClient } from '@/utils/supabase/anonymousClient'
import { formatUnits } from 'viem'

const scannerApiKey = process.env.SCANNER_API_KEY || ''
const scannerApi = process.env.SCANNER_API_URL || ''
const COMMUNITIES = 'communities'


export async function PUT() {
    try {
        await updateCommunities();
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 })
    }
}

export async function GET() {
    const supabaseClient = createAnonymousClient()

    const { data, error } = await supabaseClient.from(COMMUNITIES).select('*', { head: false })
    if (error) return NextResponse.json(error, { status: 500 })
    const response = {
        tokensInCirculation: data.reduce((sum, item) => sum + item.tokens, 0),
        tokenTransfers: data.reduce((sum, item) => sum + item.transfers, 0),
        members: data.reduce((sum, item) => sum + item.members, 0),
        activeVendors: data.reduce((sum, item) => sum + item.vendors, 0),
        communities: data.map(community => ({
            id: community.id,
            name: community.name,
            members: community.members,
            tokenSupply: community.tokens
        }))
    }
    return NextResponse.json(response)
}


async function updateCommunities() {

    const supabaseClient = createAnonymousClient()

    const { data, error } = await supabaseClient.from(COMMUNITIES).select('*').not('id', 'is', null)
    if (error) throw new Error(`Error gathering communities: ${error}`)
    console.log("Communities " + data.length)



    data.forEach(async community => {
        console.log("Updating " + community.name)
        const communityData = await gatherContractInfo(community.contract_address, community.last_block)
        const vendorsData = await supabaseClient.from('vendors').select('*', { count: 'exact', head: true }).eq('community', community.id);
        console.log("Current comunity ", community)
        community.transfers = communityData.transfers
        community.members = communityData.members
        community.tokens = communityData.tokens
        community.last_block = communityData.last_block
        community.vendors = vendorsData.count
        console.log("Before saving ", community)
        const updateResult = await supabaseClient
            .from(COMMUNITIES)
            .update(community)
            .eq('id', community.id)
            .select()
            .single()
        if (updateResult.error != null)
            throw new Error(`Error updating communities: ${error}`)
    });
    return true;
}

async function callApi(apiURL: string, params: any): Promise<any> {
    try {
        console.log('Calling ', apiURL)
        const response = await axios.get(apiURL, params)

        if (response.data.status !== '1') {
            throw new Error('Remote API error fetching data: ' + response.data.message + ' ' + response.data.result)
        }
        return response.data.result;
    } catch (error) {
        console.error('Unexpected error fetching data:', error)
        throw error;
    }
}

async function gatherContractInfo(contractAddress: string, fromBlock: number): Promise<Record<string, any>> {

    const getTokenSupplyParams = {
        'module': 'token',
        'action': 'getToken',
        'contractaddress': contractAddress
    }
    const getHolderCountSupplyParams = {
        'module': 'token',
        'action': 'getTokenHolders',
        'contractaddress': contractAddress
    }
    const countTransferCallssApiUrl = {
        'module': 'token',
        'action': 'tokentx',
        'fromBlock': fromBlock,
        'toBlock': 'latest',
        'contractaddress': contractAddress
    }


    const communityData: Record<string, any> = {}

    const tokenSuppply = await callApi(scannerApi, { params: getTokenSupplyParams })
    console.log("Got tokens: ", tokenSuppply)
    communityData['tokens'] = formatUnits(tokenSuppply.totalSupply, tokenSuppply.decimals)
    console.log("Set tokens: " + communityData['tokens'])
    const members = await callApi(scannerApi, { params: getHolderCountSupplyParams })
    communityData['members'] = members.length
    console.log("Got members: " + communityData['members'])

    const transferCalls: any = await callApi(scannerApi, { params: countTransferCallssApiUrl })
    communityData['transfers'] = transferCalls.length
    console.log("Got transfers: " + communityData['transfers'])

    const lastBlockHex = transferCalls.reduce(
        (max: any, block: any) => {
            const currentBlockNumber = toInteger(block.blockNumber);
            const maxBlockNumber = toInteger(max.blockNumber);
            return currentBlockNumber > maxBlockNumber ? block : max;
        }
        , transferCalls[0]);

    communityData['last_block'] = toInteger(lastBlockHex.blockNumber)

    console.log("Got last block: ", communityData['last_block'])
    return communityData
}


function toInteger(value: string) {
    return parseInt(`0x${value}`, 16)
}