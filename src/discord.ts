import fetch from 'node-fetch';

export async function webhook(url: string, payload: string, blocking: boolean = false) {
    console.log(`Webhook ${url} sending...`)
    for (let index = 1; index <= 3; index++) {
        const body = { "content": payload }
        const response = await fetch(blocking ? url + "?wait=1" : url, { method: "POST", body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } })
        if (!blocking)
            return true
        if (response.status > 299) {
            function sleep(ms: number) {
                return new Promise((resolve) => {
                    setTimeout(resolve, ms);
                });
            }
            if (index == 3) {
                console.log("Webhook Error.")
                return false
            }
            console.log("Webhook send failed. Resend after " + index * 1000 + " seconds...")
            await sleep(index * 1000)
            continue
        }
        else
            return true
    }
    return false
}