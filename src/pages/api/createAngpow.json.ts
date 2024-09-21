import type { APIRoute } from 'astro';
import supabase from '@/supabase';
import { getEnsName, setEnsName } from './_util';

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json()

  if (body.username) {
    try {
      const ensName = await getEnsName(body.address.toLowerCase())
      if (ensName === "") {

        //await setEnsName({
        //  "key": body.username,
        //  "value": {
        //    "addresses": {
        //      "60": body.address
        //    },
        //    //"text": { "email": "yikkai@ruilabs.com" }
        //  }
        //})
      }
      //await supabase.from('angpow_subdomain')
      //  .upsert({
      //    address: body.address.toLowerCase(),
      //    ensname: body.username,
      //  }, {
      //    ignoreDuplicates: true
      //  })
      //  .throwOnError()
    } catch (err) {
      console.error(18, err)
      if (err) return new Response(JSON.stringify({ error: "failed to create subdomain" }));
    }
  }



  // const { data, error } = await supabase.from("angpow").insert({
  //   token: body.token,
  //   amount: body.amount,
  //   status: 'DRAFT',
  //   quantity: body.quantity,
  //   color: body.color,
  //   design: body.design,
  //   message: body.message,
  //   is_worldcoin_required: body.is_worldcoin_required
  // }).select().single();
  // console.log(23, data, error)

  const { data, error } = await supabase.from("angpow").insert(body).select().single();
  console.log(data, error)

  if (body?.is_worldcoin_required) {

    // const app_id = "app_staging_1fe6ccaa14409704f71091493087e46f";
    const app_id = "app_3fce0a48811b44d2fc3e452699a480d4";



    await fetch(`https://developer.worldcoin.org/api/v2/create-action/${app_id}`, {
      method: 'POST',
      headers: {
        'authorization': `Bearer api_a2V5Xzk5ODBlYjU1N2Y2M2IzMjBkMTRkMjI2NzRkOTRhMDZlOnNrXzkyYWQ1NTJjNDFiMmE1ZDMwZTMwNzkxZTQzODQxZTE2OWFmMjkwOGNkOGRkYTY3MQ`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: String(data.id),
        name: String(data.id),
        description: "test World ID in the Worldcoin Developer Documentation",
        max_verifications: 1,
      }),
    })

  }


  if (error) return new Response(JSON.stringify(error));

  return new Response(JSON.stringify(data))
}
