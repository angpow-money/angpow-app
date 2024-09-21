

import { atom } from 'nanostores'

// export const ANGPOW_CONTRACT = atom("0x353fCB9FE729a892E9716fcC142262d7635DFF6f");
export const ANGPOW_CONTRACT = atom("0x25a25506B36626d328B1ebE0D16aEF2d3713CE91");
// export const ABB_SEPOLIA_RPC_URL = atom("https://endpoints.omniatech.io/v1/arbitrum/sepolia/public");
export const ABB_SEPOLIA_RPC_URL = atom("https://arb-sepolia.g.alchemy.com/v2/cOI6YkiomPgpNGs89aF2LTMS50_vpRr2");


import { zeroAddress, parseEther } from 'viem';
import { writeContract, signMessage } from '@wagmi/core';
import { $account, $config } from '@/stores/wallet';
import { ANGPOW_ABI } from '@/angpow-abi';

export const createAngpow = async (angpao: any) => {

    console.log("createAngpow");

    const etherAmount = angpao.eth_amount;
    const quantity = angpao.copies;

    const amount = parseEther(String(etherAmount));

    let address = $account.get() as any

    // console.log("angpao", angpao);


    const payload = {
        amount: etherAmount,
        token: zeroAddress,
        quantity: quantity,
        message: angpao.angpao_message,
        design: angpao.angpao_design,
        // color: angpao.angpao_color,
        gradient: angpao.angpao_color.gradient,
        solid: angpao.angpao_color.solid,
        username: angpao.username_input,
        is_worldcoin_required: angpao.is_worldcoin_required,
        address: address.address
    }
    console.log('payload', payload)

    /// draft to supabase
    const resp = await fetch(`/api/createAngpow.json`, {
        method: 'post',
        body: JSON.stringify(payload)
    }).then(res => res.json())
    console.log('resp', resp);

    let _address = $account.get() as any
    const config = $config.get() as any;

    const result = await writeContract(config, {
        abi: ANGPOW_ABI,
        address: ANGPOW_CONTRACT.value as any,
        functionName: 'createAngpow',
        args: [
            String(resp.id),
            zeroAddress,
            amount,
            quantity,
        ],
        value: amount,
        chainId: _address?.chainId
    })

    console.log(result);
    
    //await waitForTransactionReceipt(config, {
    //    hash: result,
    //})
    // await waitForTransactionReceipt(config, {
    //     hash: result,
    // })

    return resp.id
}


export const receiveAngpow = async () => {

    console.log("receiveAngpow");

    try {

        const id = 8

        const message = JSON.stringify({
            id: id
        })

        let address = $account.get() as any
        const config = $config.get() as any;

        const result = await signMessage(config, {
            account: address,
            message: message
        })

        console.log('result', result)

        const receipt = await fetch(`/api/requestAngpow.json`, {
            method: 'post',
            body: JSON.stringify({
                id: id,
                signature: result,
                message: message,  
                sender: address
            })
        }).then(res => res.json())

        console.log("receipt", receipt);

    } catch(err) {
        console.error(err)
    }

}
