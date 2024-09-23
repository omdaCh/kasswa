import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { IItem } from '../item.model';
import { ItemService } from '../items.service';
import { ActivatedRoute } from '@angular/router';
import { getDiscountPercentage } from '../../tools/tools';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemAboutAddingToCartComponent } from '../item-about-adding-to-cart/item-about-adding-to-cart.component';

@Component({
  selector: 'item-list-component',
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.scss'
})
export class ItemListComponent implements OnInit {

  items: IItem[] = [];

  getDiscountPercentage = getDiscountPercentage;

  @ViewChild('mainContainer')
  mainContainer!: ElementRef

  private itemService: ItemService = inject(ItemService);
  private route: ActivatedRoute = inject(ActivatedRoute);

  private modalService: NgbModal = inject(NgbModal);

  ngOnInit(): void {
    this.items = []
    this.route.queryParamMap.subscribe((params) => {
      const gender = params.get('gender');
      const age = params.get('age');
      const search = params.get('search');
      if (gender || age) {
        this.itemService.getItemsOfGenderAge(gender, age).subscribe(items => {
          this.items = items;
        })
      } else if (search) {
        this.itemService.searchItems(search).subscribe(items => {
          this.items = items;
        })
      } else {
        this.itemService.getItems().subscribe(items => {
          this.items = items;
        })
      }
      if (this.mainContainer) {
        this.mainContainer.nativeElement.scrollTop = 0;
      }
    });
  }

  onAddToCartClick(event: Event, item: IItem): void {
    event.stopPropagation();
    const modelRef = this.modalService.open(ItemAboutAddingToCartComponent, { centered: true, windowClass: 'full-width-modal' });
    modelRef.componentInstance.itemId = item.id;
  }



}
