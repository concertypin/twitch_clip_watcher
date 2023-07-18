import { Buffer } from "buffer";
import fetch from "node-fetch"

export function b64decode(str: string): string { return Buffer.from(str, 'base64').toString('utf8'); }
function b64encode(str: string): string { return Buffer.from(str, 'binary').toString('base64'); }

export async function getWebData(url: string): Promise<string> {
    const response = await fetch(url)

    return await response.text()
}