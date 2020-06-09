export class Role {
  constructor(
    public name: string,
    public description: string,
    public active: boolean,
    public id?: string,
  ) { }
}
