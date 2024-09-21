

import { atom } from 'nanostores'

// export const ANGPOW_CONTRACT = atom("0x353fCB9FE729a892E9716fcC142262d7635DFF6f");
export const ANGPOW_CONTRACT = atom("0x25a25506B36626d328B1ebE0D16aEF2d3713CE91");
export const ABB_SEPOLIA_RPC_URL = atom("https://endpoints.omniatech.io/v1/arbitrum/sepolia/public");

import { zeroAddress, parseEther } from 'viem';
import { writeContract, readContract, waitForTransactionReceipt, signMessage } from '@wagmi/core';
import { config } from '@/wagmiConfig';
import { $account } from '@/stores/wallet';
import { ANGPOW_ABI } from '@/angpow-abi';

export const createAngpow = async () => {

    console.log("createAngpow");

    const etherAmount = 0.00001;
    const quantity = 1;

    const amount = parseEther(String(etherAmount));

    /// draft to supabase
    const resp = await fetch(`/api/createAngpow.json`, {
        method: 'post',
        body: JSON.stringify({
            amount: etherAmount,
            token: zeroAddress,
            quantity: quantity,
        })
    }).then(res => res.json())
    console.log('resp', resp);

    const result = await writeContract(config, {
        abi: ANGPOW_ABI,
        address: ANGPOW_CONTRACT.value,
        functionName: 'createAngpow',
        args: [
            String(resp.id),
            zeroAddress,
            amount,
            quantity,
        ],
        value: amount,
        chainId: $account.value.chainId
    })

    await waitForTransactionReceipt(config, {
        hash: result,
    })



}


export const receiveAngpow = async () => {

    console.log("receiveAngpow");

    try {

        const id = 8

        const message = JSON.stringify({
            id: id
        })

        const result = await signMessage(config, {
            account: $account.value.address,
            message: message
        })

        console.log('result', result)

        const receipt = await fetch(`/api/requestAngpow.json`, {
            method: 'post',
            body: JSON.stringify({
                id: id,
                signature: result,
                message: message,  
                sender: $account.value.address
            })
        }).then(res => res.json())

        console.log("receipt", receipt);

    } catch(err) {
        console.error(err)
    }

}