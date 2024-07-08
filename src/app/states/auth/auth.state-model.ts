import { User } from '../../models/user';

export interface AuthStateModel {
  user: User;
  token: string;
  role: string;
}
