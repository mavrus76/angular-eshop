import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comment',
  template: `
    <div class="comments">
      <div>
        {{ comment.date | date }}
      </div>
      <div>
        {{ comment.text }}
      </div>
      <div>
        {{ comment.user | appFio }}
      </div>
    </div>
  `,
  styles: [
    `
      .comments {
        border: 1px solid #ddd;
        margin: 12px;
        padding: 12px;
        border-radius: 16px;
        line-height: 1.5;
      }
    `,
  ],
})
export class CommentComponent implements OnInit {
  @Input() comment: any;
  constructor() {}

  ngOnInit(): void {}
}
