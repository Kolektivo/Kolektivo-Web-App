import { Communities, Community } from '@/types/communities'
import { formatCurrency } from '@/utils/formatters/numeric'
import { gatherScannerInfo } from '@/utils/integration/scanner'
import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'


const COMMUNITIES = 'communities'
const VENDORS = 'vendors'
const UPDATE_INTERVAL_MS = 3600 * 1000;

export async function getCommunities(): Promise<NextResponse> {
  console.log('Fetching communities');
  
  const supabaseClient = await createClient();

  try {
    await updateCommunities();
  } catch (error) {
    console.error('Error actualizando comunidades:', error);
    return NextResponse.json({ message: 'Error updating communities' }, { status: 500 });
  }

  try {
    const [communitiesResult, vendorsResult] = await Promise.all([
      supabaseClient
        .from(COMMUNITIES)
        .select('*')
        .not('id', 'is', null),
      supabaseClient
        .from(VENDORS)
        .select('*', { count: 'exact' })
        .not('id', 'is', null)
    ]);

    if (communitiesResult.error) {
      console.error('Error getting communities:', communitiesResult.error);
      return NextResponse.json({ message: 'Error getting communities' }, { status: 500 });
    }

    if (vendorsResult.error) {
      console.error('Error getting vendors:', vendorsResult.error);
      return NextResponse.json({ message: 'Error getting vendors' }, { status: 500 });
    }

    const communities = communitiesResult.data;
    const activeVendors = vendorsResult.count || 0;

    const response: Communities = {
      tokensInCirculation: formatCurrency(
        communities.reduce((sum, community) => sum + community.tokens, 0) * 0.15,
        'Dollard'
      ),
      tokenTransfers: communities.reduce((sum, community) => sum + community.transfers, 0),
      members: communities.reduce((sum, community) => sum + community.members, 0),
      activeVendors,
      communities: communities.map((community): Community => ({
        id: community.id,
        name: community.name,
        members: community.members,
        tokenSupply: formatCurrency(community.tokens, 'Dollard'),
        srcImage: community.srcImage,
        transfers: community.transfers,
      })),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error communities:', error);
    return NextResponse.json({ message: 'Error communities' }, { status: 500 });
  }
}

async function updateCommunities(): Promise<boolean> {
  console.log('Updating communities');

  const supabaseClient = await createClient();

  
  const oneHourAgo = new Date(Date.now() - UPDATE_INTERVAL_MS).toISOString();

  try {
    
    const { data, error } = await supabaseClient
      .from(COMMUNITIES)
      .select('*')
      .lte('last_update', oneHourAgo)
      .eq('id', 'Trinidad'); 

    if (error) {
      throw new Error(`Error gathering communities: ${error.message}`);
    }

    if (!data || data.length === 0) {
      console.log('No communities require updating.');
      return true;
    }

    console.log(`Communities to update: ${data.length}`);

    const updatePromises = data.map(async (community) => {
      try {
        console.log(`Updating ${community.name}`);

        // Obtener la información actualizada desde el scanner
        const communityData = await gatherScannerInfo(
          community.contract_address,
          community.last_block
        );

        if (!communityData) {
          throw new Error('No data returned from gatherScannerInfo');
        }

        console.log('Current community data:', community);

      
        const updatedCommunity: Partial<Community> = {
          transfers: communityData.transfers,
          members: communityData.members,
          tokens: communityData.tokens,
          last_block: communityData.last_block,
        };


        const { error: updateError } = await supabaseClient
          .from(COMMUNITIES)
          .update(updatedCommunity)
          .eq('id', community.id);

        if (updateError) {
          throw new Error(`Error updating community data: ${updateError.message}`);
        }

 
        const { error: lastUpdateError } = await supabaseClient
          .from(COMMUNITIES)
          .update({ last_update: new Date().toISOString() })
          .eq('id', community.id);

        if (lastUpdateError) {
          throw new Error(`Error updating last_update: ${lastUpdateError.message}`);
        }

        console.log(`Successfully updated community: ${community.name}`);
      } catch (communityError) {
        console.error(`Failed to update community ${community.id}:`, communityError);
       
      }
    });

    
    await Promise.all(updatePromises);

    console.log('All applicable communities have been processed.');
    return true;
  } catch (error) {
    console.error('Error in updateCommunities:', error);
    throw error; 
  }
}