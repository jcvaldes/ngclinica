import { Role } from '../roles/role.model';
import { Category } from '../categories/category.model';
import { Schedule } from '../../../models/schedule.model';

export interface IUser {
  fullname: string;
  lastname: string;
  email: string;
  password: string;
  confirmpassword?: string;
  roles?: Role[];
  categories?: Category[];
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
    public categories?: Category[],
    public Schedules?: Schedule[],
    public img?: string,
    public google?: string,
    public id?: string
  ) {}
}
