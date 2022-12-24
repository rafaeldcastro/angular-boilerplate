export class BaseModel {
  any?: any;

  constructor(data?: Partial<BaseModel>) {
    if (data) Object.assign(this, JSON.parse(JSON.stringify(data)));
  }

  static factory(data: Partial<BaseModel>): Partial<BaseModel> {
    return new BaseModel(data);
  }
}
