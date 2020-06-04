export class Role {
  constructor(
    public rolename: string,
    public description: string,
    public active: boolean,
    public id?: string,
  ) { }
}
