export class Card {

  id: number;
  cardHolder: string;
  cardNumber: string;
  expiryDate: string;
  cvvCode: string;
  userId: number;


  constructor(id: number, cardHolder: string, cardNumber: string, expiryDate: string, cvvCode: string, userId: number) {
    this.id = id;
    this.cardHolder = cardHolder;
    this.cardNumber = cardNumber;
    this.expiryDate = expiryDate;
    this.cvvCode = cvvCode;
    this.userId = userId;
  }
}
