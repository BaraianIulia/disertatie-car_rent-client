export class CurrentUser {

  id: number;
  name: string;
  surname: string;
  email: string;
  userRole: string;

  constructor(id: number, name: string, surname: string, email: string, userRole: string) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.userRole = userRole;
  }

}
