export interface LoginResponse {
  user: IUser;
  token: string;
}

interface IUser {
  id: number;
  user: string;
  role: string;
}