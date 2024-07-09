import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee, faBagShopping, faCartShopping, faSearch } from '@fortawesome/free-solid-svg-icons';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from './cart/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, FontAwesomeModule, NgbModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',

})
export class AppComponent implements OnInit {
  title = 'e-commerce';

  route: ActivatedRoute = inject(ActivatedRoute);

  faCoffee = faCoffee;
  faBagShopping = faBagShopping;
  faCartShopping = faCartShopping;
  faSearch = faSearch;

  isNavbarCollapsed = signal(true);

  search: string | null = '';

  constructor(public cartService: CartService,) {

  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.search = params.get('search');
    })
  }

  collapseNavbar(): void {
    this.isNavbarCollapsed.set(true);
  }

  toggleNavbar(): void {
    this.isNavbarCollapsed.update(isNavbarCollapsed => !isNavbarCollapsed);
  }

}

export interface BreadCrumb {
  label: string;
  url: string;
};
