import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import products from '../../assets/product.data.json';
import { CommentService } from '../services/comment.service';
import {
  ProductsResponse,
  ProductsService,
} from '../services/products.service';
import { Product } from '../types/product-api.model';

@Component({
  selector: 'app-product',
  template: `
    <div class="content">
      <ng-container *ngIf="product">
        <div class="card-wrapper">
          <app-card-info [product]="product"></app-card-info>
        </div>
      </ng-container>
      <div>
        <h3>Отзывы</h3>
        <div>
          <div *ngFor="let comment of comments">
            <app-comment [comment]="comment"></app-comment>
          </div>
        </div>
        <div class="comments">
          <div *ngIf="isWriteComment">
            <textarea [(ngModel)]="currentComment"> </textarea>
            <app-button
              buttonType="basic"
              [color]="'accent'"
              text="Применить"
              (click)="accept()"></app-button>
            <app-button
              buttonType="basic"
              [color]="'accent'"
              text="Отменить"
              (click)="cancel()"></app-button>
          </div>
          <app-button
            *ngIf="!isWriteComment"
            buttonType="basic"
            [color]="'accent'"
            text="Комментировать"
            (click)="writeComment()"></app-button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .card-wrapper {
        margin-right: 25px;
        max-width: 300px;
        width: 100%;
      }
      .content {
        display: flex;
      }
      .comments {
        display: flex;
        padding: 12px;
      }
    `,
  ],
})
export class ProductComponent implements OnInit {
  public products$: Observable<ProductsResponse> =
    this.productsService.getProducts$({});
  public productsData: Array<Product> = [];
  // productsData: Array<any> = [];
  product: any;
  currentComment = '';
  comments: Array<any> = [];
  isWriteComment = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commentService: CommentService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.products$.subscribe(response => {
      this.productsData = response.items;
      const productId = +this.route.snapshot.params['id'];
      this.product = this.productsData.find(x => x.id === productId);

      console.log(this.product);
      if (this.product === undefined) {
        this.router.navigateByUrl('not-found');
      }

      this.comments = this.commentService
        .getComments()
        .filter(x => x.productId === this.product.id);
    });
  }

  writeComment() {
    this.isWriteComment = !this.isWriteComment;
  }
  accept() {
    this.isWriteComment = !this.isWriteComment;

    this.commentService.addComment({
      id: this.comments.length + 1,
      productId: this.product.id,
      user: {
        firstName: 'Maxim',
        lastName: 'Vysotskiy',
      },
      text: this.currentComment,
      date: new Date(),
    });

    this.currentComment = '';
    this.comments = this.commentService
      .getComments()
      .filter(x => x.productId === this.product.id);
  }

  cancel() {
    this.isWriteComment = !this.isWriteComment;
  }
}
