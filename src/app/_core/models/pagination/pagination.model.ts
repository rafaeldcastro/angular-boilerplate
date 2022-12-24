import { BaseResourceModel } from '@core/models/base/base-resource.model';
interface RequestFilter {
    filterId: string;
    filterValue: string;
}

export class PaginationModel {
    page?: number;
    pageSize?: number;
    count?: number;
    pageCount?: number;
    pageNumberIsGood?: boolean;
    hasPreviousPage?: boolean;
    hasNextPage?: boolean;
    isFirstPage?: boolean;
    isLastPage?: boolean;
    numberOfFirstItemOnPage?: number;
    firstItemOnPage?: number;
    numberOfLastItemOnPage?: number;
    lastItemOnPage?: number;

    rows?: BaseResourceModel[];

    requestFilters?: RequestFilter[];

    constructor(data?: Partial<PaginationModel>) {
        if (data) Object.assign(this, JSON.parse(JSON.stringify(data)));
    }

    static factory(data: Partial<PaginationModel>): Partial<PaginationModel> {
        return new PaginationModel(data);
    }
}
