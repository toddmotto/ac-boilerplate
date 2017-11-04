import { PizzasGuard } from './pizzas.guard';
import { ToppingsGuard } from './toppings.guard';

export const guards: any[] = [PizzasGuard, ToppingsGuard];

export * from './pizzas.guard';
export * from './toppings.guard';
