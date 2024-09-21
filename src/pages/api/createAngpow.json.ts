import type { APIRoute } from 'astro';
import supabase from '@/supabase';

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json()

  console.log(body);
  try {
    await supabase.from('angpow_subdomain')
      .upsert({
        address: body.address.toLowerCase(),
        ensname: body.username,
      }, {
        ignoreDuplicates: true
      })
      .throwOnError()
  } catch (err) {
    console.error(18, err)
    if (err) return new Response(JSON.stringify({ error: "failed to create subdomain" }));
  }

  const { data, error } = await supabase.from("angpow").insert({
    token: body.token,
    amount: body.amount,
    status: 'DRAFT',
    quantity: body.quantity,
    color: body.color,
    design: body.design,
    message: body.message,
    is_worldcoin_required: body.is_worldcoin_required
  }).select().single();
  console.log(23, data, error)
  if (error) return new Response(JSON.stringify(error));

  return new Response(JSON.stringify(data))
}
