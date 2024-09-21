export async function getEnsName(address: string) {
  // return supabase.from('angpow_subdomain')
  //   .select()
  //   .eq('address', address)
  //   .maybeSingle()
  //   .throwOnError()
  return fetch(`https://angpow_ens_worker.junyaoxiandingchan.workers.dev/getredis/${address}`)
    .then(res => res.json())
    .then(res => res.value || "")
}

export async function setEnsName(body: any) {
  console.log("bidyddddd", body);

  try {

    await fetch(`https://angpow_ens_worker.junyaoxiandingchan.workers.dev/set`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    })
  } catch(error) {
    console.log("error setEnsName", error)
  }

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
