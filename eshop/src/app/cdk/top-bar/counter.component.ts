import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <div class="counter">
      <div>
        <app-button
          text="-"
          color="primary"
          size="small"
          (click)="decrease()"></app-button>
      </div>
      <input type="text" class="count" value="{{ value }}" />
      <div>
        <app-button
          text="+"
          color="primary"
          size="small"
          (click)="increase()"></app-button>
      </div>
    </div>
  `,
  styles: [
    `
      .counter {
        display: flex;
        border: 1px solid #dadada;
        border-radius: 10px;
        width: 130px;
      }
      .count {
        align-self: center;
        border: none;
        width: 100%;
        font-size: 16px;
        text-align: center;
        outline: none;
      }
    `,
  ],
})
export class CounterComponent implements OnInit {
  @Input() value: number | null = 0;
  @Output() valueIncrease: EventEmitter<any> = new EventEmitter<any>();
  @Output() valueDecrease: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {}

  increase() {
    this.valueIncrease.emit();
  }

  decrease() {
    this.valueDecrease.emit();
  }

  // Lesson 8.2 time 11:50
  @Output() valueChange: EventEmitter<number> = new EventEmitter<number>();
  public buttonChange($event: Event, change: number): void {
    $event.preventDefault();
    this.value = this.value! + change;
    this.changeValue(this.value);
  }
  inputChange(value: number): void {
    this.value = value;
    this.changeValue(this.value);
  }
  private changeValue(value: number): void {
    this.valueChange.emit(value);
  }
}
