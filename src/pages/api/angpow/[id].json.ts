import type { APIRoute } from 'astro';
import supabase from '@/supabase';
//import { getEnsName, getEnsAddress, getEnsText, getEnsResolver } from "@wagmi/core";
//import { ensConfig } from '@/wagmiConfig';
import { getEnsName } from '../_util';
//import { EnsResolver, ethers } from 'ethers';
//import { offchainLookup } from 'viem';
//
//import { http } from 'viem'
//import { mainnet } from 'viem/chains'
//import { createEnsPublicClient } from '@ensdomains/ensjs/wallet'

export const GET: APIRoute = async ({ params }) => {

  const { data: event, error } = await supabase.from("angpow")
    .select("*, created_events:event_angpow_created(*), received_events:event_angpow_received(*)")
    .eq("id", params.id)
    .single()

  if (error) return new Response(JSON.stringify(error));

  console.log(event)

  if (event.created_events.length > 0) {
    const createdEvent = event.created_events[0]

    const name = await getEnsName(createdEvent.donator)
      .catch(err => {
        console.error(err)
        return Response.json({
          error: "failed to get ens name"
        }, { status: 422 })
      })

    event.donator_ens_name = name
  }

  event.received = event.received_events.length > 0
  //await getEnsAddress(ensConfig, { name: "deployer.angpao.money" }).then(console.log)
  //const client = createEnsPublicClient({
  //  chain: mainnet,
  //  transport: http(),
  //})

  //await client.getAddressRecord({ name: 'deployer.angpao.money' })
  //  .then(console.log)

  //const provider = new ethers.JsonRpcProvider('https://arbitrum-sepolia.blockpi.network/v1/rpc/public')
  ////const resolver = new EnsResolver(provider, "0xF142B308cF687d4358410a4cB885513b30A42025", 'resolver')
  //const ensName = await getEnsName(ensConfig, {
  //  address: "0x11aBE031A9bb2D752C7D38Dbcb2Bc672AAc1dBa4",
  //  //universalResolverAddress: "0xF142B308cF687d4358410a4cB885513b30A42025",
  //})
  //console.log(event.donator, ensName)


  return Response.json({
    ...event,
    created_events: undefined,
    received_events: undefined,

  })
}

