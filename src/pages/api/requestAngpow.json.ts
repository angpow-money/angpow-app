import type { APIRoute } from 'astro';
import * as ethers from "ethers";
import supabase from '@/supabase';

export const POST: APIRoute = async ({ request }) => {
    const body = await request.json()
  
    console.log(body);

    const recoveredAddress = ethers.verifyMessage(body.message, body.signature);
    const isValidSignature = recoveredAddress.toLowerCase() === body.sender.toLowerCase();

    if(!isValidSignature) return new Response(JSON.stringify({
        error: "invalid signature"
    }))

    const angpow = await supabase.from("angpow").select("").eq("id", body.id).single().then((res:any) => res.data);
    console.log(angpow) 

    if(angpow.status !== "ACTIVE") return new Response(JSON.stringify({
        error: "invalid angpow"
    }))

    return new Response(JSON.stringify({}));

}
  