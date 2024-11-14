import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { IItem } from '../item.model';
import { ItemService } from '../item.service';
import { ActivatedRoute } from '@angular/router';
import { getDiscountPercentage } from '../../tools/tools';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemAboutAddingToCartComponent } from '../item-about-adding-to-cart/item-about-adding-to-cart.component';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'item-list-component',
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.scss'
})
export class ItemListComponent implements OnInit {

  items: IItem[] = [];
  itemsAreLoading: boolean = false;

  getDiscountPercentage = getDiscountPercentage;

  @ViewChild('mainContainer')
  mainContainer!: ElementRef

  private itemService: ItemService = inject(ItemService);
  private route: ActivatedRoute = inject(ActivatedRoute);

  private modalService: NgbModal = inject(NgbModal);

  filtredListTitle: string = '';

  ngOnInit(): void {

    this.route.queryParamMap.pipe(
      switchMap(params => {
        this.items = [];
        this.itemsAreLoading = true;
        const gender = params.get('gender');
        const age = params.get('age');
        const search = params.get('search');



        // Determine the appropriate item fetching method
        if (gender || age) {
          if (gender == 'male') {
            this.filtredListTitle = 'Men clothes'
          } else if (gender == 'female') {
            this.filtredListTitle = 'Women clothes'
          }
          else {
            this.filtredListTitle = 'Kids clothes'
          }
          return this.itemService.getItemsOfGenderAge(gender, age);
        } else if (search) {
          return this.itemService.searchItems(search);
        } else {
          return this.itemService.getItems();
        }
      })
    ).subscribe({
      next: (items) => {
        this.items = items;
        this.itemsAreLoading = false
        this.scrollToTop();
      },
      error: (err) => { console.log(err) }
    });
  }

  // Scroll to the top of the container
  private scrollToTop(): void {
    if (this.mainContainer) {
      this.mainContainer.nativeElement.scrollTop = 0;
    }
  }

  onAddToCartClick(event: Event, item: IItem): void {
    event.stopPropagation();
    const modelRef = this.modalService.open(ItemAboutAddingToCartComponent, { centered: true, windowClass: 'full-width-modal' });
    modelRef.componentInstance.itemId = item.id;
  }

}
