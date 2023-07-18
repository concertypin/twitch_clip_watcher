import { Twitch } from "./twitch"
import { webhook } from "./discord"
import { ClipLoopupUser, toClipLooupUserClass } from "./models"
import { b64decode, getWebData } from "./utils"
import { setting } from "./settings"

async function main() {
    let clipLoopupUsers: Array<ClipLoopupUser> = []
    if (setting.CLIPPER_DATA?.startsWith("http://") || setting.CLIPPER_DATA?.startsWith("https://")) {
        clipLoopupUsers = toClipLooupUserClass(await getWebData(setting.CLIPPER_DATA))
    }
    else
        clipLoopupUsers = toClipLooupUserClass(b64decode(setting.CLIPPER_DATA))

    const client = new Twitch()
    client.onPrivmsg(function (privmsg) {
        if (privmsg.sender !== "bbangddeock")
            return
        if (!privmsg.message.includes(setting.isClipMessage))
            return

        console.log("clip creation detected : " + privmsg.message)
        const url = "https://" + privmsg.message.split("https://")[1]
        console.log("crawled url : " + url)

        clipLoopupUsers.forEach(function (user) {
            console.log("is " + user.id + "'s one?s")
            if (!privmsg.message.includes("@" + user.id))
                return
            console.log(user.id + "'s, sending " + user.webhook)
            webhook(user.webhook, url, user.priority)
        })
    })

    client.run()
}
await main()