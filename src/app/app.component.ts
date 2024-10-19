import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
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
  cartService:CartService = inject(CartService);


  isNavbarCollapsed = signal(true);

  search: string | null = '';

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
