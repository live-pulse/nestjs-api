export class UserResponse {
  constructor(
    id: number,
    account: string,
    name: string,
    email: string,
    userImageUrl: string,
    phone: string,
    role: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.account = account;
    this.name = name;
    this.email = email;
    this.userImageUrl = userImageUrl;
    this.phone = phone;
    this.role = role;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
  id: number;
  account: string;
  name: string;
  email: string;
  userImageUrl: string;
  phone: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}
