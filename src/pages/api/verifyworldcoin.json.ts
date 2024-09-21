
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
    const body = await request.json()
    
    const verified = await verifyProof(body.proof, body.action);
    console.log("verified", verified);
    
    return new Response(JSON.stringify(verified));
}
  


const verifyProof = async (proof:any, action:any) => {
    console.log('proof', proof);
    
    try {

        const response = await fetch(
            // 'https://developer.worldcoin.org/api/v1/verify/app_staging_1fe6ccaa14409704f71091493087e46f',
            'https://developer.worldcoin.org/api/v1/verify/app_3fce0a48811b44d2fc3e452699a480d4',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...proof, action: action}),
            }
        );
        console.log('aavvvvvvv', response?.ok, response?.status, response?.statusText, JSON.stringify(response))
        
        if (response.ok) {
            const dat = await response.json();
            // console.log('dat', dat);
            return dat;
        } else {
            // const { code, detail } = await response.json();
            // throw new Error(`Error Code ${code}: ${detail}`);
            // throw new Error(`failed.`);
            return { "success": false };
        }

    } catch(error) {
        console.log('abbbb', error)
    }
    
};