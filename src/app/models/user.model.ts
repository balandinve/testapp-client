export class User {
  userName: string;
  password: string;
  fullName: string;
  constructor(item: any = null) {
    this.userName = item && item.userName || null;
    this.password = item && item.password || null;
    this.fullName = item && item.fullName || null;
  }
}
