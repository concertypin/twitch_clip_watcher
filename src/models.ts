export class ClipLoopupUser {
    id: string;
    webhook: string;
    priority: boolean = false;
    constructor(id: string, webhook: string, priority: boolean = false) {
        this.id = id;
        this.webhook = webhook;
        if (priority !== undefined)
            this.priority = priority;
    }
}
export function toClipLooupUserClass(input: string): Array<ClipLoopupUser> {
    var r: Array<ClipLoopupUser> = []
    JSON.parse(input).user.forEach((i: { username: string; webhook: string; priority: boolean | undefined; }) => {
        r.push(new ClipLoopupUser(i.username, i.webhook, i.priority))
    });
    return r
}