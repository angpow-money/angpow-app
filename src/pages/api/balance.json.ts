import type { APIRoute } from 'astro';
import { getBalance } from './_util';

export const GET: APIRoute = async ({ request }) => {
  
  const address = new URL(request.url).searchParams.get('address')

  const balance = await getBalance(address)
  console.log(balance)
  //if (error) return new Response(JSON.stringify(error));

  return Response.json({
    amount: (Number(balance) / 1e18).toString()
  })
}
