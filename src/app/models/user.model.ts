export class User {

  id: number;
  name: string;
  surname: string;
  birthdate: Date;
  email: string;
  password: string;
  phone: string;
  address: string;
  userRole: string;
  photo: any;
  status: boolean;
  fileToUpload: string;


  constructor(id: number, name: string, surname: string, birthdate: Date, email: string, password: string, phone: string,
              address: string, userRole: string, photo: any, status: boolean) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.birthdate = birthdate;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.address = address;
    this.userRole = userRole;
    this.photo = photo;
    this.status = status;
  }
}
