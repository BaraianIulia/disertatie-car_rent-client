import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DatePipe} from '@angular/common';
import {Card} from '../models/card.model';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  uri = 'http://localhost:8082/cards';

  constructor(private http: HttpClient, public datepipe: DatePipe) {
  }


  getUserCards(userId: number) {
    return this.http.get<Card[]>(`${this.uri}/list/` + userId, {});
  }

  addCard(card: Card) {
    return this.http.post<Card>(`${this.uri}/add`, card);
  }

  deleteCard(cardId: number) {
    return this.http.delete(`${this.uri}/delete/` + cardId);
  }

}
