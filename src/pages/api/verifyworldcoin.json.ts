
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
    const body = await request.json()
    
    const verified = await verifyProof(body.proof);
    console.log("verified", verified);
    
    return new Response(JSON.stringify(verified))
}
  


const verifyProof = async (proof:any) => {
    console.log('proof', proof);
    const response = await fetch(
        'https://developer.worldcoin.org/api/v1/verify/app_staging_1fe6ccaa14409704f71091493087e46f',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...proof, action: "testverify"}),
        }
    );
    if (response.ok) {
        const dat = await response.json();
        // console.log('dat', dat);
        return dat;
    } else {
        //   const { code, detail } = await response.json();
        //   throw new Error(`Error Code ${code}: ${detail}`);
        return { "success": false };
    }
};