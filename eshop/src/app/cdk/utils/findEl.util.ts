import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export const findEl = <T>(fixture: ComponentFixture<T>, testId: string) =>
  fixture.debugElement.query(By.css(testId));
