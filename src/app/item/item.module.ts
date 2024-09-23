import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbCarousel, NgbCarouselModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ItemAboutAddingToCartComponent } from './item-about-adding-to-cart/item-about-adding-to-cart.component';


const routes: Routes = [
  {
    path: "",
    redirectTo: "/item/item-list",
    pathMatch: 'full'
  },
  {
    path: "item-list",
    component: ItemListComponent,
  },
  {
    path: "item-detail",
    component: ItemDetailComponent,
  }
];

@NgModule({
  declarations: [ItemListComponent, ItemDetailComponent, ItemAboutAddingToCartComponent],
  imports: [
    RouterModule, RouterOutlet, CommonModule, RouterModule.forChild(routes), NgbRatingModule, FontAwesomeModule,
    NgbCarousel, NgbCarouselModule
  ],
  providers: [HttpClientModule]
})
export class ItemModule { }
