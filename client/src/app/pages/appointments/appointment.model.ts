import { User } from '../admin/users/user.model';
export class Appointment {
  constructor(
    public UserId: number,
    public ProfessionalId: number,
    public CategoryId: number,
    public turnDate: Date,
    public active: boolean,
    public createdAt: Date,
    public id?: number
  ){}
}
