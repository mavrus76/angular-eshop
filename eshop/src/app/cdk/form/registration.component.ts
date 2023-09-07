import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registration',
  template: `
    <div class="container">
      <h3>Регистрация пользователя</h3>
      <form
        class="form"
        #form="ngForm"
        (ngSubmit)="sendForm(form)"
        [ngFormOptions]="{ updateOn: 'blur' }">
        <section class="form__personal">
          <h5>Личные данные</h5>

          <div class="row mb-3">
            <div class="form-group col-6">
              <label>Имя:</label>
              <input
                class="form-control"
                name="firstName"
                #firstName="ngModel"
                [(ngModel)]="user.firstName"
                pattern="[A-Za-zА-Яа-яЁё]{2,30}"
                minlength="2"
                required />
              <ng-container *ngIf="errorShow">
                <app-error
                  *ngIf="firstName.hasError('required')"
                  message="Заполните поле"></app-error>
              </ng-container>
              <app-error
                *ngIf="firstName.hasError('minlength')"
                message="Минимальная длина 2 символа"></app-error>
              <app-error
                *ngIf="firstName.hasError('pattern')"
                message="Только буквы русского и латинского алфавита"></app-error>
            </div>
            <div class="form-group col-6">
              <label>Фамилия:</label>
              <input
                class="form-control"
                name="lastName"
                pattern="[A-Za-zА-Яа-яЁё]{2,30}"
                minlength="2"
                required
                #lastName="ngModel"
                [(ngModel)]="user.lastName" />
              <ng-container *ngIf="errorShow">
                <app-error
                  *ngIf="lastName.hasError('required')"
                  message="Заполните поле"></app-error>
              </ng-container>
              <app-error
                *ngIf="lastName.hasError('minlength')"
                message="Минимальная длина 2 символа"></app-error>
              <app-error
                *ngIf="lastName.hasError('pattern')"
                message="Только буквы русского и латинского алфавита"></app-error>
            </div>
          </div>

          <div class="form-group mb-3">
            <label>Email:</label>
            <input
              type="email"
              class="form-control"
              name="email"
              required
              email
              #email="ngModel"
              [(ngModel)]="user.email" />
            <ng-container *ngIf="errorShow">
              <app-error
                *ngIf="email.hasError('required')"
                message="Заполните поле"></app-error>
            </ng-container>
            <app-error
              *ngIf="email.hasError('email')"
              message="Невалидный email"></app-error>
          </div>

          <div
            ngModelGroup="password"
            #passwordGroup="ngModelGroup"
            appPasswordMatch>
            <div class="form-group mb-3">
              <label>Пароль:</label>
              <input
                class="form-control"
                type="password"
                name="password"
                required
                ngModel
                #password="ngModel"
                pattern="[A-Za-z0-9]{8,16}" />
              <app-error
                *ngIf="password.hasError('pattern')"
                message="Невалидный пароль"></app-error>
              <ng-container *ngIf="errorShow">
                <app-error
                  *ngIf="password.hasError('required')"
                  message="Заполните поле"></app-error>
              </ng-container>
            </div>
            <div class="form-group">
              <label>Повторите пароль:</label>
              <input
                class="form-control"
                type="password"
                name="confirm"
                required
                ngModel
                #confirm="ngModel" />
              <app-error
                *ngIf="passwordGroup.hasError('passwordMatch')"
                message="Пароли не совпадают"></app-error>
              <ng-container *ngIf="errorShow">
                <app-error
                  *ngIf="confirm.hasError('required')"
                  message="Заполните поле"></app-error>
              </ng-container>
            </div>
          </div>
        </section>

        <div class="form-submit">
          <app-button text="Регистрация" color="accent"></app-button>
        </div>
      </form>
    </div>
  `,
  styleUrls: ['./form.component.scss'],
})
export class RegistrationComponent implements OnInit {
  public user = {
    firstName: '',
    lastName: '',
    email: '',
  };
  public errorShow = false;

  sendForm(form: NgForm): void {
    if (!form.valid) {
      this.errorShow = true;
      return;
    }
    console.log(form.value);
    form.reset();
    this.errorShow = false;
  }

  constructor() {}

  ngOnInit(): void {}
}
