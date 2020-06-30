export interface ITimeSlot {
  ProfessionalId: number;
  day: number;
  timeStart: Date;
  timeEnd: Date;
  active: boolean;
  id?: number;
}
export class TimeSlot implements ITimeSlot{
  constructor(
    public ProfessionalId: number,
    public day: number,
    public timeStart: Date,
    public timeEnd: Date,
    public active: boolean,
    public id?: number
  ) {}
}
