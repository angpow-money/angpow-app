import type { APIRoute } from 'astro';
import { getBalance } from './_util';

export const GET: APIRoute = async ({ request }) => {
  
  const address : any = new URL(request.url).searchParams.get('address')

  const balance = await getBalance(address)
  //if (error) return new Response(JSON.stringify(error));

  return Response.json({
    amount: (Number(balance) / 1e18).toString()
  })
}
