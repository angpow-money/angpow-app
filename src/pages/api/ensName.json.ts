import type { APIRoute } from 'astro';
import { getEnsName } from './_util';

export const GET: APIRoute = async ({ request, params }) => {
  //request.blob

  const addr = new URL(request.url).searchParams.get('address')

  const name = await getEnsName(addr)
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


