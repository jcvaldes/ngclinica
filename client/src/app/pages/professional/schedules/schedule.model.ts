export class Schedule {
  constructor(
    public PatientId: number,
    public ProfessionalId: number,
    public CategoryId: number,
    public appointmentDate: Date,
    public active: boolean,
    public createdAt: Date,
    public id?: number
  ){}
}
