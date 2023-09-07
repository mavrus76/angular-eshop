import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'appCurrency' })
export class AppCurrencyPipe extends DecimalPipe implements PipeTransform {
  private readonly symbols: { [key: string]: string } = {
    rub: '₽',
    usd: '$',
    eur: '€',
  };
  override transform(
    value: string | number,
    digitsInfo?: string,
    locale?: string
  ): string | null;
  override transform(
    value: null | undefined,
    digitsInfo?: string,
    locale?: string
  ): null;
  override transform(
    value: string | number | null | undefined,
    currencyCode: string,
    digitsInfo?: string
  ): string | null {
    const symbol = this.symbols[currencyCode.toLowerCase()];
    const price = super.transform(value, digitsInfo || '1.0-0');

    return price?.toString() + ' ' + symbol.toString();
  }
}
