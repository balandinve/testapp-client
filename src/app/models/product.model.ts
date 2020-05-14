export class Product {
  id: number;
  title: string;
  constructor(item: any = null) {
    this.id = item && item.id || null;
    this.title = item && item.title || null;
  }
}
