import { Role } from '../roles/role.model';

export interface IUser {
  fullname: string;
  lastname: string;
  email: string;
  password: string;
  confirmpassword?: string;
  roles?: Role[];
  img?: string;
  google?: string;
  id?: string;
}
export class User implements IUser{
  constructor(
    public fullname: string,
    public lastname: string,
    public email: string,
    public password: string,
    public confirmpassword?: string,
    public roles?: Role[],
    public img?: string,
    public google?: string,
    public id?: string
  ) {}
}
