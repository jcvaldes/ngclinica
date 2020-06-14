import { User } from '../users/user.model';
export class Category{
  constructor(
    public name: string,
    public active: boolean,
    public users?: User[], // profesionales
    public id?: string
  ) {}
}
