import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-rates',
  template: `
    <div class="stars">
      <input
        type="radio"
        id="rate5{{ productId }}"
        name="rating"
        value="5"
        [attr.checked]="isChecked(5)"
        readonly /><label for="rate5{{ productId }}"></label>
      <input
        type="radio"
        id="rate4{{ productId }}"
        name="rating"
        value="4"
        [attr.checked]="isChecked(4)"
        readonly /><label for="rate4{{ productId }}"></label>
      <input
        type="radio"
        id="rate3{{ productId }}"
        name="rating"
        value="3"
        [attr.checked]="isChecked(3)"
        readonly /><label for="rate3{{ productId }}"></label>
      <input
        type="radio"
        id="rate2{{ productId }}"
        name="rating"
        value="2"
        [attr.checked]="isChecked(2)"
        readonly /><label for="rate2{{ productId }}"></label>
      <input
        type="radio"
        id="rate1{{ productId }}"
        name="rating"
        value="1"
        [attr.checked]="isChecked(1)"
        readonly /><label for="rate1{{ productId }}"></label>
    </div>
  `,
  styleUrls: ['./rates.component.scss'],
})
export class RatesComponent implements OnInit {
  @Input() rating: any;
  @Input() productId: any;

  public isChecked(value: any): string {
    return this.rating === value ? '' : null!;
  }

  public checked(value: any) {
    if (this.rating >= value) {
      return value;
    }
  }
  // [ngClass]="{ active: checked(1) }"

  constructor() {}

  ngOnInit(): void {}
}
