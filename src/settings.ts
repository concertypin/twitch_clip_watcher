import { config } from "dotenv"
config();

class Setting {
    isClipMessage = "클립이 생성되었습니니다.[Temporary] StreamLadder - "
    CLIPPER_DATA: string
    LOGIN_USERNAME: string
    TARGET_USERNAME: string
    TWITCH_TOKEN: string
    constructor() {
        config();
        if (process.env.TARGET_USERNAME != undefined)
            this.TARGET_USERNAME = process.env.TARGET_USERNAME
        else
            throw Error("env target_username is undefined")
        if (process.env.LOGIN_USERNAME != undefined)
            this.LOGIN_USERNAME = process.env.LOGIN_USERNAME
        else
            throw Error("env login_username is undefined")
        if (process.env.CLIPPER_DATA != undefined)
            this.CLIPPER_DATA = process.env.CLIPPER_DATA
        else
            throw Error("env clipper_Data is undefined")
        if (process.env.TWITCH_TOKEN != undefined)
            this.TWITCH_TOKEN = process.env.TWITCH_TOKEN
        else
            throw Error("env token is undefined")
    }
}
export const setting = new Setting()