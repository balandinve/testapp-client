export class ProductFilter {
  take: number;
  page: number;
  sortOrder: typeof SORT_ORDER;
  sortField: string;
  title: string;
  constructor(item: any = null) {
    this.take = item && item.take || 10;
    this.page = item && item.page || 1;
    this.sortOrder = item && item.sortOrder || SORT_ORDER.ASC;
    this.sortField = item && item.sortField || 'id';
    this.title = item && item.title || null;
  }

}

export enum SORT_ORDER {
  ASC,
  DESC
}
