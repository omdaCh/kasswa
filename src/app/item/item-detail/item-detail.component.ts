import { Component, ElementRef, Inject, Input, OnInit, ViewChild, inject } from '@angular/core';
import { IItem, ItemColor, ItemSize } from '../item.model';
import { ActivatedRoute } from '@angular/router';
import { NgbCarousel, NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { getDiscountPercentage } from '../../tools/tools';
import { ItemService } from '../item.service';
import { CartService } from '../../cart/cart.service';
import { ItemAboutAddingToCartComponent } from '../item-about-adding-to-cart/item-about-adding-to-cart.component';
import { catchError, filter, finalize, map, of, Subject, switchMap, takeUntil, tap } from 'rxjs';


@Component({
  selector: 'app-second-component',
  templateUrl: './item-detail.component.html'
})
export class ItemDetailComponent implements OnInit {


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

  private modalService: NgbModal = inject(NgbModal);

  itemIsLoading: boolean = false;

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.itemIsLoading = true;
    this.activeRoute.queryParamMap.pipe(
      map(params => params.get('id')),
      filter((id): id is string => id !== null),
      tap(() => this.scrollToTop()),
      switchMap(id => this.itemService.find(id)),
      tap(item => this.updateItemDetails(item)),
      tap(() => this.itemIsLoading = false),
      filter(item => !!item.gender && !!item.age),
      switchMap(item => this.itemService.getSimilarItemsOfItem(item)),
      tap(similarItems => this.similairItems = similarItems),
      catchError(error => {
        console.error('Error fetching item or similar items:', error);
        return of([] as IItem[]); // Return an empty array on error
      }),
      takeUntil(this.destroy$),
    ).subscribe();
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateItemDetails(item: IItem): void { // Replace 'any' with your actual item type
    this.item = item;
    this.selectedPhotoUrl = item?.colors[0]?.photos[0];
    this.colorSelected = item?.colors[0];
  }

  private scrollToTop(): void {
    if (this.mainContainer) {
      this.mainContainer.nativeElement.scrollTop = 0;
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
      this.cartService.addItem(this.item, this.colorSelected.colorName, this.sizeSelected.name, 1)
    }
  }

  onSimilarItemAddToCartClick(event: Event, item: IItem): void {
    event.stopPropagation();
    const modelRef = this.modalService.open(ItemAboutAddingToCartComponent, { centered: true, windowClass: 'full-width-modal' });
    modelRef.componentInstance.itemId = item.id;
  }

}
