export class BaseModel {

    any: any;

    constructor(data: Partial<BaseModel>) {
        this.factory(data);
    }

    private factory(object: Partial<BaseModel>) {
        Object.assign(this, JSON.parse(JSON.stringify(object)));
    }
}
