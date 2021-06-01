export class CarQuizz {
  brand: string[];
  fabricationYear: number;
  pricePerDay: number;
  horsePower: number;
  seats: number;
  color: string[];
  startDate: Date;
  endDate: Date;


  constructor(brand: string[], fabricationYear: number, pricePerDay: number, horsePower: number, seats: number, color: string[], startDate: Date, endDate: Date) {
    this.brand = brand;
    this.fabricationYear = fabricationYear;
    this.pricePerDay = pricePerDay;
    this.horsePower = horsePower;
    this.seats = seats;
    this.color = color;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
