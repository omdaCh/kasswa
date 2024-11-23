import { Component, inject } from '@angular/core';
import { CartService } from './cart.service';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RemoveCartItemComponent } from './removeCartItem/remove-cart-item.component';
import { CartItem } from './cart.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  protected cartService: CartService = inject(CartService)
  private modalService: NgbModal = inject(NgbModal);

  removeCartItem(cartItemToRemove: CartItem): void {
    this.modalService.open(RemoveCartItemComponent, { centered: true, }).result.then(
      (result) => {
        if (result == 'confirm') {
          this.cartService.removeCartItem(cartItemToRemove);
        }
      }
    );
  }

  incrementQuantity(cartItem: CartItem): void {
    this.cartService.setCartItemQuantity(cartItem, cartItem.quantity + 1);
  }

  decrementQuantity(cartItem: CartItem): void {
    if (cartItem.quantity === 1) {
      this.removeCartItem(cartItem)
    }
    else {
      this.cartService.setCartItemQuantity(cartItem, cartItem.quantity - 1);
    }
  }
}

