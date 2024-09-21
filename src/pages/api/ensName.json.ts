import type { APIRoute } from 'astro';
import { getEnsName } from './_util';

export const GET: APIRoute = async ({ request }) => {
  //request.blob
  // console.log(5)

  const addr = new URL(request.url).searchParams.get('address') as string;

  const name = await getEnsName(addr.toLowerCase())
    .catch(err => {
      console.error(err)
      return Response.json({
        error: "failed to get ens name"
      }, { status: 422 })
    })

  return Response.json({
    name
  })
}


import { Redis } from '@upstash/redis/cloudflare';
export const POST: APIRoute = async ({ request }) => {

  const body = await request.json()

  console.log(body);

  const redis = new Redis({
    url: "https://positive-treefrog-20660.upstash.io",
    token: "AVC0AAIjcDEwZmJlZWVjZjZmNjQ0MzgyOTg2MzMzYzc0YmUwNTFjNXAxMA"
  })


  const resp = await redis.mget(body)
  console.log(resp);

  return new Response(JSON.stringify(resp));

}