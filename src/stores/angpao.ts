import { atom } from 'nanostores'
import { $account } from '@/stores/wallet';
import { config } from '@/wagmiConfig';
import { signMessage } from '@wagmi/core';

export const $state = atom(null);
export const $show_palette = atom(false);
export const $flip_angpao = atom(false);
export const $open_angpao = atom(false);


export const $zoom_close = atom(false);
export const $zoom_far = atom(true);
export const $zoom_far_far = atom(false);

export const $pan_up = atom(false);
export const $pan_up_up = atom(false);
export const $pan_up_palette = atom(false);
export const $pan_down = atom(false);
export const $pan_down_open = atom(false);
export const $token_up = atom(false)

export const $selectedColorClass = atom('bg-gradient-to-b from-poppy-400 to-poppy-500');
export const $selectedBgColor = atom('bg-poppy');

export const $show_titles = atom(true)
export const $angpao_message = atom('')
export const $angpao_value = atom(null)
export const $angpao_design = atom(false)
export const $angpao_eth_amount = atom(0)

export const receiveAngpow = async (id:any) => {

    console.log("receiveAngpow");

    try {

        const message = JSON.stringify({
            id: id
        })

        let address = $account.get() as any

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
