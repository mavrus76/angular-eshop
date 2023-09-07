import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CheckoutService } from 'src/app/services/checkout.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-checkout',
  template: `
    <div
      class="container"
      (window:unload)="this.storageService.putDataForm(checkoutFormStorage)">
      <h3>Оформление заказа</h3>
      <form class="form" [formGroup]="checkoutForm" (ngSubmit)="submitForm()">
        <section class="form__personal">
          <h5>Личные данные</h5>

          <div class="row mb-3">
            <div class="form-group">
              <label>Имя Фамилия:</label>
              <input
                class="form-control"
                name="fullName"
                pattern="^([A-Za-zА-Яа-яЁё]{2,}\\s[A-Za-zА-Яа-яЁё]{1,}'?-?[A-Za-zА-Яа-яЁё]{1,}\\s?([A-Za-zА-Яа-яЁё]{1,})?)$"
                formControlName="fullName" />
              <ng-container *ngIf="errorShow">
                <app-error
                  *ngIf="fNameControl?.hasError('required')"
                  message="Заполните поле"></app-error>
              </ng-container>
              <app-error
                *ngIf="fNameControl?.hasError('pattern')"
                message="Минимальная длина 2 символа в слове, 2 слова, русские и латинские буквы"></app-error>
            </div>
          </div>

          <div class="form-group mb-3">
            <label>Телефон:</label>
            <input
              type="tel"
              class="form-control"
              name="phone"
              pattern="^\\+7[0-9]{10}$"
              formControlName="phone" />
            <ng-container *ngIf="errorShow">
              <app-error
                *ngIf="checkoutForm.controls['phone']?.hasError('required')"
                message="Заполните поле"></app-error>
            </ng-container>
            <app-error
              *ngIf="checkoutForm.controls['phone'].hasError('pattern')"
              message="Невалидный номер. Например: +79001234567"></app-error>
          </div>
        </section>

        <div class="mb-3">
          <h5>Доставка</h5>
          <div class="form-group">
            <input
              class="form-check-input"
              type="radio"
              name="delivery"
              id="radioOne"
              formControlName="delivery"
              (ngModelChange)="showDelivery(!$event)"
              value="Самовывоз" />
            <label class="form-check-label px-2" for="radioOne">
              Самовывоз
            </label>
          </div>
          <div class="form-group">
            <input
              class="form-check-input"
              type="radio"
              name="delivery"
              id="radioTwo"
              formControlName="delivery"
              (ngModelChange)="showDelivery($event)"
              value="Доставка ТК" />
            <label class="form-check-label px-2" for="radioTwo">
              Доставка ТК
            </label>
          </div>
          <ng-container *ngIf="errorShow">
            <app-error
              *ngIf="checkoutForm.controls['delivery']?.hasError('required')"
              message="Выберите способ доставки"></app-error>
          </ng-container>
        </div>

        <ng-container *ngIf="createDelivery">
          <section class="form__delivery">
            <div class="form-group mb-3">
              <label>Город:</label>
              <select class="form-control" name="city" formControlName="city">
                <option *ngFor="let item of availableCities" [ngValue]="item">
                  {{ item['city'] }}
                </option>
              </select>
              <ng-container *ngIf="errorShow">
                <app-error
                  *ngIf="checkoutForm.controls['city']?.hasError('required')"
                  message="Выберите город доставки"></app-error>
              </ng-container>
            </div>
            <div class="form-group mb-3">
              <label>Улица:</label>
              <input
                class="form-control"
                name="street"
                formControlName="street" />
              <ng-container *ngIf="errorShow">
                <app-error
                  *ngIf="checkoutForm.controls['street']?.hasError('required')"
                  message="Укажите улицу"></app-error>
              </ng-container>
            </div>
            <div class="form-group mb-3">
              <label>Дом:</label>
              <input
                class="form-control"
                name="house"
                formControlName="house" />
              <ng-container *ngIf="errorShow">
                <app-error
                  *ngIf="checkoutForm.controls['house']?.hasError('required')"
                  message="Укажите  дом"></app-error>
              </ng-container>
            </div>
            <div class="form-group mb-3">
              <label>Квартира:</label>
              <input class="form-control" name="flat" formControlName="flat" />
              <ng-container *ngIf="errorShow">
                <app-error
                  *ngIf="checkoutForm.controls['flat']?.hasError('required')"
                  message="Укажите квартиру"></app-error>
              </ng-container>
            </div>
          </section>
        </ng-container>

        <div class="mb-3">
          <h5>Оплата</h5>
          <div class="form-group">
            <input
              class="form-check-input"
              type="radio"
              name="payment"
              id="radioOne1"
              checked
              formControlName="payment"
              value="Картой" />
            <label class="form-check-label px-2" for="radioOne1">
              Картой
            </label>
          </div>
          <div class="form-group">
            <input
              class="form-check-input"
              type="radio"
              name="payment"
              id="radioTwo2"
              formControlName="payment"
              value="Наличными" />
            <label class="form-check-label px-2" for="radioTwo2">
              Наличными
            </label>
          </div>
          <ng-container *ngIf="errorShow">
            <app-error
              *ngIf="checkoutForm.controls['payment']?.hasError('required')"
              message="Выберите способ оплаты"></app-error>
          </ng-container>
        </div>

        <div class="form-submit">
          <app-button text="Заказать" color="accent"></app-button>
        </div>
      </form>
    </div>
  `,
  styleUrls: ['./form.component.scss'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  public errorShow = false;
  public createDelivery = false;
  public availableCities: Array<{ [key: string]: string | number }> = [
    { city: 'Москва', code: 1 },
    { city: 'Санкт-Петербург', code: 2 },
    { city: 'Мурманск', code: 3 },
    { city: 'Новосибирск', code: 4 },
    { city: 'Краснодар', code: 5 },
  ];

  public subscriptionForm!: Subscription;
  public checkoutForm: FormGroup = this.fb.group({
    fullName: ['', [Validators.required, Validators.pattern]],
    phone: ['', [Validators.required, Validators.pattern]],
    delivery: ['', [Validators.required]],
    city: ['', [Validators.required]],
    street: ['', [Validators.required]],
    house: ['', [Validators.required]],
    flat: ['', [Validators.required]],
    payment: ['', [Validators.required]],
  });

  public checkoutFormStorage = {
    fullName: '',
    phone: '',
    delivery: '',
    city: '',
    street: '',
    house: '',
    flat: '',
    payment: '',
  };

  submitForm() {
    if (!this.checkoutForm.valid) {
      this.errorShow = true;
      return;
    } else {
      console.log(this.checkoutForm.value);
      this.checkoutForm.reset();
      this.errorShow = false;
    }
  }

  get fNameControl() {
    return this.checkoutForm.get('fullName');
  }

  showDelivery(checkboxValue: boolean): void {
    const cash = document.querySelector('#radioTwo2');
    this.createDelivery = checkboxValue;
    if (this.createDelivery) {
      cash?.setAttribute('disabled', 'disabled');
      this.checkoutForm.controls['payment'].reset();
    } else {
      cash?.removeAttribute('disabled');
    }
  }

  constructor(private fb: FormBuilder, public storageService: StorageService) {}

  ngOnInit(): void {
    // const phoneControl = this.checkoutForm.controls['phone'];
    this.subscriptionForm = this.checkoutForm.valueChanges.subscribe(
      checkoutFormValue => {
        this.checkoutFormStorage = checkoutFormValue;
        console.table(checkoutFormValue);
      }
    );

    this.storageService.putDataForm(this.checkoutFormStorage);

    if (localStorage.getItem('dataForm') !== null) {
      this.checkoutForm.setValue(this.storageService.getDataForm());
    }

    // phoneControl.valueChanges.subscribe(phoneControlValue =>
    //   console.log({ phoneControlValue })
    // );
  }

  ngOnDestroy(): void {
    this.storageService.putDataForm(this.checkoutFormStorage);
    this.subscriptionForm.unsubscribe();
  }
}
