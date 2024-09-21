import type { APIRoute } from 'astro';
import supabase from '@/supabase';

export const GET: APIRoute = async ({ params, url }) => {

  const userAddress : any = url.searchParams.get('address')

  const { data: event, error } = await supabase.from("angpow")
    .select("received_events:event_angpow_received(*)")
    .eq("id", params.id)
    .single()

  if (error) return new Response(JSON.stringify(error));

  const received = event.received_events.findIndex((o:any) => o.recipient === userAddress.toLowerCase()) !== -1

  return Response.json({
    received
  })
}
