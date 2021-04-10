export class Car {

  id: number;
  vehicleIdentificationNumber: string;
  brand: string;
  model: string;
  doors: number;
  seats: number;
  fabricationYear: number;
  gearbox: string;
  pricePerDay: number;
  insurance: number;
  horsePower: number;
  hexColor: number;
  color: string;
  conditionalAir: boolean;
  fuelType: string;
  luggageCarrierVolume: number;
  photo: string;


  constructor(id: number, vehicleIdentificationNumber: string, brand: string, model: string, doors: number, seats: number,
              fabricationYear: number, gearbox: string, pricePerDay: number, insurance: number, horsePower: number, hexColor: number,
              color: string, conditionalAir: boolean, fuelType: string, luggageCarrierVolume: number, photo: string) {
    this.id = id;
    this.vehicleIdentificationNumber = vehicleIdentificationNumber;
    this.brand = brand;
    this.model = model;
    this.doors = doors;
    this.seats = seats;
    this.fabricationYear = fabricationYear;
    this.gearbox = gearbox;
    this.pricePerDay = pricePerDay;
    this.insurance = insurance;
    this.horsePower = horsePower;
    this.hexColor = hexColor;
    this.color = color;
    this.conditionalAir = conditionalAir;
    this.fuelType = fuelType;
    this.luggageCarrierVolume = luggageCarrierVolume;
    this.photo = photo;
  }
}
