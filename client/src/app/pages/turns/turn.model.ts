import { User } from '../admin/users/user.model';
export class Turn {
  constructor(
    public UserId: number,
    public ProfesionalId: number,
    public CategoryId: number,
    public turnDate: Date,
    public active: boolean,
    public createdAt: Date,
    public id?: number
  ){}
}
