export interface ISchedule {
  ProfesionalId: number;
  day: number;
  timeStart: Date;
  timeEnd: Date;
  active: boolean;
  id?: number;
}
export class Schedule implements ISchedule{
  constructor(
    public ProfesionalId: number,
    public day: number,
    public timeStart: Date,
    public timeEnd: Date,
    public active: boolean,
    public id?: number
  ) {}
}
