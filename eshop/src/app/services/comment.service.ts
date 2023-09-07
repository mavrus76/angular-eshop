import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CommentService {
  private comments = [
    {
      id: 1,
      productId: 1,
      user: {
        lastName: 'Высоцкий',
        firstName: 'Максим',
      },
      text: 'Отличный товар, спасибо!',
      date: new Date(),
    },
  ];

  public getComments() {
    return this.comments;
  }

  public addComment(comment: any) {
    this.comments.push(comment);
  }
}
