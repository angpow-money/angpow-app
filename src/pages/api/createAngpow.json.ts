import type { APIRoute } from 'astro';
import supabase from '@/supabase';

export const POST: APIRoute = async ({ request }) => {
    const body = await request.json()
  
    // console.log(body);
    const { data, error } = await supabase.from("angpow").insert(body).select();
    // console.log(data, error)

    if(error) return new Response(JSON.stringify(error)); 
    
    return new Response(JSON.stringify(data[0]))
}
