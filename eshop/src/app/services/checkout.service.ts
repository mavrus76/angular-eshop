import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  public users = ['user@gmail.com'];
  public blocked = ['user@mail.ru'];

  public checkUser(email: string): Observable<{ isEmailExist: boolean }> {
    return of({ isEmailExist: this.users.includes(email) }).pipe(delay(400));
  }

  public checkBlocked(email: string): Observable<{ isEmailBlocked: boolean }> {
    return of({ isEmailBlocked: this.blocked.includes(email) }).pipe(
      delay(400)
    );
  }

  constructor() {}
}
