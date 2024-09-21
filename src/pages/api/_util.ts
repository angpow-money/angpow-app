import supabase from "@/supabase"

export async function getEnsName(address: string) {

  return supabase.from('angpow_subdomain')
    .select()
    .eq('address', address)
    .maybeSingle()
    .throwOnError()
    .then(res => res.data?.ensname || "")
}

export async function getBalance(address: string) {

  return fetch('https://arb-sepolia.g.alchemy.com/v2/cOI6YkiomPgpNGs89aF2LTMS50_vpRr2', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "jsonrpc": "2.0",
      "method": "eth_getBalance",
      "params": [address, "latest"],
      "id": 1

    })
  })
    .then(res => res.json())
    .then(res => BigInt(res.result))
}
