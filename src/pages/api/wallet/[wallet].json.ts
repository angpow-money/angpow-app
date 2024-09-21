

import type { APIRoute } from 'astro';
import supabase from '@/supabase';

export const GET: APIRoute = async (context) => {
  
    // console.log(context.params)

    const distributed = await supabase.from("event_angpow_created").select("*, angpow(*)").eq("donator", context.params.wallet?.toLowerCase()).then((res:any) => res.data);
    // console.log(angpows)

    const received = await supabase.from("event_angpow_received").select("*, angpow(*)").eq("recipient", context.params.wallet?.toLowerCase()).then((res:any) => res.data);
    
    return new Response(JSON.stringify({
        created: distributed,
        received: received,
    }))


}
  



