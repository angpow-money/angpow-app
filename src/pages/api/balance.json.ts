import { config } from '@/wagmiConfig';
import { getBalance } from '@wagmi/core';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {

  const address = new URL(request.url).searchParams.get('address')

  const balance = await getBalance(config, { address: address as any })
  //if (error) return new Response(JSON.stringify(error));

  return Response.json({
    amount: balance.formatted
  })
}

