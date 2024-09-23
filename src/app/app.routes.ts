import { Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { OrdersComponent } from './orders/orders.component';


export const routes: Routes = [
    {
        path: "",
        redirectTo: "/item",
        pathMatch: 'full'
    },
    {
        path: "item",
        loadChildren: () => import('./item/item.module').then(m => m.ItemModule),
    },
    
    {
        path: "cart",
        component: CartComponent
    },
    {
        path: "checkout",
        loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule)
    },
    {
        path:'my-purchases',
        component: OrdersComponent
    }
]