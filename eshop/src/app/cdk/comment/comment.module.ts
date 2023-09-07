import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from './comment.component';
import { AppFioPipe } from '../pipes/fio.pipe';

@NgModule({
  declarations: [CommentComponent, AppFioPipe],
  imports: [CommonModule],
  exports: [CommentComponent],
})
export class CommentModule {}
