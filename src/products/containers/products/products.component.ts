import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/observable'

import { Pizza } from '../../models/pizza.model';

import * as fromStore from '../../store';

@Component({
  selector: 'products',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['products.component.scss'],
  template: `
    <div class="products">
      <div class="products__new">
        <a
          class="btn btn__ok"
          routerLink="./new">
          New Pizza
        </a>
      </div>
      <div class="products__list">
        <div *ngIf="!((pizzas$ | async)?.length)">
          No pizzas, add one to get started.
        </div>
        <pizza-item
          *ngFor="let pizza of (pizzas$ | async)"
          [pizza]="pizza">
        </pizza-item>
      </div>
    </div>
  `,
})
export class ProductsComponent implements OnInit {
  public pizzas$: Observable<Pizza[]>;

  constructor(
    private store: Store<fromStore.ProductsState>,
  ) {}

  ngOnInit() {
    this.pizzas$ = this.store.select(
      fromStore.getPizzas,
    );
    this.store.dispatch(new fromStore.LoadPizzas());
  }
}
