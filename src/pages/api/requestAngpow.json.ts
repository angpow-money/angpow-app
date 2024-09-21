import type { APIRoute } from 'astro';
import * as ethers from "ethers";
import supabase from '@/supabase';

const privateKey = "baf29ef55222b84b776c22581202eeb4899fea6171939d53954fe9cdc7d98ac7";
const provider = new ethers.JsonRpcProvider("https://arbitrum-sepolia.blockpi.network/v1/rpc/public")
const wallet = new ethers.Wallet(privateKey, provider);
const abi = [
  "function receiveAngpow(uint256 id, address recipient) external"
]
const contractAddress = "0x25a25506B36626d328B1ebE0D16aEF2d3713CE91"
const contract = new ethers.Contract(contractAddress, abi, wallet);

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json()

  console.log(body);

  const recoveredAddress = ethers.verifyMessage(body.message, body.signature);
  const isValidSignature = recoveredAddress.toLowerCase() === body.sender.toLowerCase();

  if (!isValidSignature) return new Response(JSON.stringify({
    error: "invalid signature"
  }))

  const angpow = await supabase.from("angpow").select("").eq("id", body.id).single().then((res: any) => res.data);
  console.log(angpow)

  if (angpow.status !== "ACTIVE") return new Response(JSON.stringify({
    error: "invalid angpow"
  }))

  const tx = await contract.receiveAngpow(body.id, recoveredAddress.toLowerCase());
  console.log("Transaction hash:", tx.hash);

  return new Response(JSON.stringify({}));

}

