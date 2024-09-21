import type { APIRoute } from 'astro';
import supabase from '@/supabase';

export const GET: APIRoute = async ({ params, url }) => {

  const { data: event, error } = await supabase.from("event_angpow_received")
    .select("")
    .eq("angpow_id", params.id)

  if (error) return new Response(JSON.stringify(error));

  console.log(event)
  return Response.json(event);

}
