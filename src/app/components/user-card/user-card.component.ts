import {Component, OnInit} from '@angular/core';
import {CurrentUser} from '../../models/currentUser.model';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {Card} from '../../models/card.model';
import {CardService} from '../../services/card.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  private currentUser: CurrentUser;
  title = 'Add card';
  formGroup;
  filtersLoaded: Promise<boolean>;
  cardList: Card[];
  emptyListMessage = 'The list is empty';
  private card: Card;

  constructor(private cardService: CardService, private router: Router, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.formGroup = this.formBuilder.group({
      id: '',
      cardNumber: '',
      cardholderName: '',
      expirationDate: '',
      cvvCode: '',
    });
    this.getUsersCards();
  }

  private getUsersCards() {
    this.cardService.getUserCards(this.currentUser.id)
      .subscribe(
        (res) => {
          this.cardList = res;
          console.log('cardlist length', this.cardList.length);
          this.filtersLoaded = Promise.resolve(true);
        }
      );
  }

  onSubmit(formData) {
    this.card = new Card(0, formData.cardholderName, formData.cardNumber.replace(/\s/g, ''),
      formData.expirationDate, formData.cvvCode, this.currentUser.id);
    console.log('add card ' + this.card.toString());
    this.cardService.addCard(this.card).subscribe(data => {
        console.log('DONE', data);
        this.cardList.push(data);
      },
      error => {
        console.log(error);
      });
  }

  deleteCard(id: number) {
    this.cardService.deleteCard(id).subscribe(data => {
        console.log('DONE', data);
        const index = this.cardList.findIndex(x => x.id === id);
        this.cardList.splice(index, 1);
      },
      error => {
        console.log(error);
      });
  }
}

