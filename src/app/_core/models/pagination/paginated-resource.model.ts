import { BaseResourceModel } from '@core/models/base/base-resource.model';
import { PaginationModel } from '@core/models/pagination/pagination.model';

export class PaginatedResourceModel extends BaseResourceModel {
    datalist?: any[];
    pagination?: PaginationModel;

    constructor(data?: Partial<PaginatedResourceModel>) {
        super();
        if (data) Object.assign(this, JSON.parse(JSON.stringify(data)));
    }

    static factory(
        data: Partial<PaginatedResourceModel>
    ): Partial<PaginatedResourceModel> {
        return new PaginatedResourceModel(data);
    }
}
