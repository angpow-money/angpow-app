import { getBalance } from '@wagmi/core';
import type { APIRoute } from 'astro';
import { $config } from '@/stores/wallet';

export const GET: APIRoute = async ({ request }) => {
  
  const address = new URL(request.url).searchParams.get('address')

  const config = $config.get() as any;
  const balance = await getBalance(config, { address: address as any })
  //if (error) return new Response(JSON.stringify(error));

  return Response.json({
    amount: balance.formatted
  })
}

