import supabase from "@/supabase"

export async function getEnsName(address: string) {

  return supabase.from('angpow_subdomain')
    .select()
    .eq('address', address)
    .maybeSingle()
    .throwOnError()
    .then(res => res.data?.ensname || "")
}
