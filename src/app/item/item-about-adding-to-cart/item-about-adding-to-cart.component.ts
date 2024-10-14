import { Component, ElementRef, Inject, Input, OnInit, ViewChild, inject } from '@angular/core';
import { IItem, ItemColor, ItemSize } from '../item.model';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbCarousel } from '@ng-bootstrap/ng-bootstrap'
import { getDiscountPercentage } from '../../tools/tools';
import { ItemService } from '../item.service';
import { CartService } from '../../cart/cart.service';


@Component({
  selector: 'item-about-adding-to-cart',
  templateUrl: './item-about-adding-to-cart.component.html'
})
export class ItemAboutAddingToCartComponent implements OnInit {


  @Input() item: IItem | null = null;

  colorSelected?: ItemColor;
  sizeSelected?: ItemSize;


  selectedPhotoUrl?: string;

  getDiscountPercentage = getDiscountPercentage;

  similairItems: IItem[] = [];

  @ViewChild('mainContainer')
  mainContainer!: ElementRef

  private activeRoute: ActivatedRoute = inject(ActivatedRoute);
  private itemService: ItemService = inject(ItemService);
  private cartService: CartService = inject(CartService);

  activeModal = inject(NgbActiveModal);

  @Input() itemId: any;

  ngOnInit(): void {
    if (this.itemId !== null) {
      this.itemService.find(this.itemId).subscribe((item_) => {
        this.item = item_;
        this.selectedPhotoUrl = this.item?.colors[0].photos[0];
        this.colorSelected = this.item?.colors[0];
        if (this.item?.gender && this.item.age) {
          this.itemService.getSimilarItemsOfItem(this.item).subscribe(similairItems => {
            this.similairItems = similairItems;
          })
        }
      });
      if (this.mainContainer) {
        this.mainContainer.nativeElement.scrollTop = 0;
      }
    }
  }

  selectedColor(selectedColor: ItemColor) {
    this.colorSelected = selectedColor;
    this.selectedPhotoUrl = this.colorSelected.photos[0];
  }

  @ViewChild('carousel') carousel!: NgbCarousel
  posIni: any;
  move(pos: number) {
    const offset = this.posIni - pos;
    if (offset < -100) this.carousel.prev()

    if (offset > 100) this.carousel.next();
  }

  onClick(event: Event): void {
    event.stopPropagation();
  }

  addToCart(): void {
    if (this.item && this.colorSelected && this.sizeSelected) {
      this.cartService.shoppingCart.addItem(this.item, this.colorSelected.colorName, this.sizeSelected.name, 1)
      this.activeModal.close();
    }
  }


}
