export interface CustomAttributes {
    email?: string;
    //+Country RegionCode Number => +5581xxxxxxxxx
    phone_number?: string;
    given_name?: string;
    family_name?: string;
}

export class Credentials {
    username?: string;
    usernameType?: string;
    password?: string;
    oldPassword?: string;
    verificationCode?: string;
    attributes?: CustomAttributes;

    constructor(data?: Partial<Credentials>) {
        if (data) Object.assign(this, JSON.parse(JSON.stringify(data)));
    }

    static factory(data: Partial<Credentials>): Partial<Credentials> {
        return new Credentials(data);
    }
}
