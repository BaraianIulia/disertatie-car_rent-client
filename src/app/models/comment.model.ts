export class Comment {

  id: number;
  carId: number;
  text: string;
  author: string;
  authorEmail: string;
  status: string;
  rating: number;
  created: Date;


  constructor(id: number, carId: number, text: string, author: string, authorEmail: string, status: string, rating: number, created: Date) {
    this.id = id;
    this.carId = carId;
    this.text = text;
    this.author = author;
    this.authorEmail = authorEmail;
    this.status = status;
    this.rating = rating;
    this.created = created;
  }
}
