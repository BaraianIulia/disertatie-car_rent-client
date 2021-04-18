export class OrderDetail {
  userId: number;
  carId: number;
  cardId: number;
  totalPrice: number;
  insurance: number;
  startDate: Date;
  endDate: Date;
  pickupDropoffLocation: string;
  payMethod: string;
  cvvCode: string;
  cardHolder: string;
  expiryDate: string;
  cardNumber: string;


  constructor(userId: number, carId: number, cardId: number, totalPrice: number,
              insurance: number, startDate: Date, endDate: Date, pickupDropoffLocation: string, payMethod: string,
              cvvCode: string, cardHolder: string, expiryDate: string, cardNumber: string) {
    this.userId = userId;
    this.carId = carId;
    this.cardId = cardId;
    this.totalPrice = totalPrice;
    this.insurance = insurance;
    this.startDate = startDate;
    this.endDate = endDate;
    this.pickupDropoffLocation = pickupDropoffLocation;
    this.payMethod = payMethod;
    this.cvvCode = cvvCode;
    this.cardHolder = cardHolder;
    this.expiryDate = expiryDate;
    this.cardNumber = cardNumber;
  }
}
