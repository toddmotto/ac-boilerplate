import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Pizza } from '../../models/pizza.model';
import * as fromStore from '../../store';

@Component({
  selector: 'product-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['product-item.component.scss'],
  template: `
    <div 
      class="product-item">
      <pizza-form
        [pizza]="pizza$ | async"
        [toppings]="toppings$ | async"
        (selected)="onSelect($event)"
        (create)="onCreate($event)"
        (update)="onUpdate($event)"
        (remove)="onRemove($event)">
        <pizza-display
          [pizza]="selected$ | async">
        </pizza-display>
      </pizza-form>
    </div>
  `,
})
export class ProductItemComponent implements OnInit {
  pizza$: Observable<Pizza>;
  selected$: Observable<Pizza>;
  toppings$: Observable<string[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromStore.ProductsState>
  ) {}

  ngOnInit() {
    this.selected$ = this.store.select(fromStore.getSelectedPizza);
    this.toppings$ = this.store.select(fromStore.getToppings);

    this.pizza$ = this.route.params.pipe(
      switchMap(params => {
        if (params.id === 'new') {
          this.store.dispatch(new fromStore.SelectPizza({}));
          return of({});
        }
        return this.store
          .select(fromStore.getPizzas)
          .pipe(
            map(pizzas =>
              pizzas.find(pizza => pizza.id == parseInt(params.id, 10))
            ),
            tap((pizza: Pizza) =>
              this.store.dispatch(new fromStore.SelectPizza(pizza))
            )
          );
      })
    );
  }

  onSelect(event: Pizza) {
    this.store.dispatch(new fromStore.SelectPizza(event));
  }

  onCreate(event: Pizza) {
    this.store.dispatch(new fromStore.CreatePizza(event));
  }

  onUpdate(event: Pizza) {
    this.store.dispatch(new fromStore.UpdatePizza(event));
  }

  onRemove(event: Pizza) {
    const remove = window.confirm('Are you sure?');
    if (remove) {
      this.store.dispatch(new fromStore.RemovePizza(event));
    }
  }
}
