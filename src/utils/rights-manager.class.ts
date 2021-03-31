import {Status} from "../models/enums/status.enum";
import {Action} from "../enums/Action.enum";
import {UserModel} from "../models/interfaces/user.model";


class StatusesManager {
    public readonly statuses: Status[];

    constructor(statuses: Status[]) {
        this.statuses = statuses;
    }

    public get isModerator(): boolean {
        return this.hasStatuses([Status.Admin, Status.Moderator]);
    }

    public get isAdmin(): boolean {
        return this.hasStatuses([Status.Admin]);
    }

    private hasStatuses(statuses: Status[]): boolean {
        return statuses.some((status: Status) => this.statuses.includes(status));
    }
}

  // Когда (если) в UserModel будут хранится Action, нужно будет переписать механизм canUseAction
export class RightsManager extends StatusesManager {
    private readonly user: UserModel;
    private useActionMap: Record<Action, boolean> = {
        createModule: this.isAdmin,
        changeModule: this.isAdmin,
        deleteModule: this.isAdmin,
        patchModule: this.isAdmin,
    };

    constructor(user: UserModel) {
        super(user.statuses);

        this.user = user;
    }

    public canUseAction(action: Action): boolean {
        return this.useActionMap[action];
    }
}
