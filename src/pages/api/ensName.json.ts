import type { APIRoute } from 'astro';
import { getEnsName } from './_util';

export const GET: APIRoute = async ({ request }) => {
  //request.blob

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


