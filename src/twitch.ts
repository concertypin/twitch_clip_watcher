import WSClient from "websocket";
import { setting } from "./settings";
const client = new WSClient.client();

const loginUsername = setting.LOGIN_USERNAME;
const targetUsername = setting.TARGET_USERNAME
const token = setting.TWITCH_TOKEN

export class Privmsg {
    sender: string;
    channel: string;
    message: string;
    constructor(sender: string, channel: string, message: string) {
        this.sender = sender;
        this.channel = channel;
        this.message = message;
    }
}

export class Twitch {
    callbacks: Array<(message: Privmsg) => void> = [];

    constructor() {
        client.on('connectFailed', function (error) {
            console.log('Connect Error: ' + error.toString());
        });
    }

    onPrivmsg(callback: (message: Privmsg) => void) {
        this.callbacks.push(callback)
    }

    run() {
        const thisClass = this
        client.on("connect", function (connection) {
            console.log('WebSocket Client Connected');
            connection.on('error', function (error) {
                console.log("Connection Error: " + error.toString());
            });
            connection.on("message", function (msg) {
                if (msg.type !== 'utf8')
                    return

                if (msg.utf8Data.includes("PRIVMSG")) {
                    const sender = msg.utf8Data.split("!")[0].replace(":", "")
                    const channel = msg.utf8Data.split("#")[1].split(":")[0].trim()
                    const message = msg.utf8Data.split("#")[1].replace(channel + " :", "")

                    thisClass.callbacks.forEach(function (callback) {
                        callback(new Privmsg(sender, channel, message))
                    })
                }
            })
            connection.sendUTF("PASS oauth:" + token);
            connection.sendUTF(`NICK ${loginUsername}`);
            connection.sendUTF("JOIN #" + targetUsername);
        })
        client.connect("wss://irc-ws.chat.twitch.tv:443");
    }
}