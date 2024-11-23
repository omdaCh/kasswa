import { TestBed } from "@angular/core/testing";
import { ItemListComponent } from "./item-list.component";
import { ItemService } from "../item.service";
import { ComponentFixture } from "@angular/core/testing";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { NgbModal, NgbRatingModule } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute, convertToParamMap, ParamMap, RouterModule } from "@angular/router";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { IItem } from "../item.model";
import { SERVER_URL } from "../../app.constants";
import { Observable, of } from "rxjs";

describe('Item list integraiton test', () => {
    

    let itemListComponent: ItemListComponent;
    let fixture: ComponentFixture<ItemListComponent>;
    let httpMock: HttpTestingController;

    interface ActivatedRouteMock {
        queryParamMap: Observable<ParamMap>;
    }
    let activatedRouteMock: ActivatedRouteMock;
    let modalServiceMock: jasmine.SpyObj<NgbModal>;

    const mockItems: IItem[] = [
        {
            id: '1',
            name: 'Stylish Shirt',
            description: 'A trendy shirt made with premium cotton.',
            colors: [
                {
                    colorName: 'Blue',
                    sizes: [
                        { name: 'S', available: true },
                        { name: 'M', available: true },
                        { name: 'L', available: false }
                    ],
                    photos: ['blue-shirt-1.jpg', 'blue-shirt-2.jpg']
                },
                {
                    colorName: 'Red',
                    sizes: [
                        { name: 'S', available: true },
                        { name: 'M', available: false },
                        { name: 'L', available: true }
                    ],
                    photos: ['red-shirt-1.jpg', 'red-shirt-2.jpg']
                }
            ],
            price: 50,
            discountedPrice: 40,
            nbrSold: 100,
            rating: 4.8,
            numberOfReviews: 150,
            brand: {
                name: 'Fashion Brand',
                photoUrl: 'fashion-brand-logo.jpg'
            },
            gender: 'male',
            age: 'Adulte',
            category: 'Shirts',
            shippingCoast: 5
        },
        {
            id: '2',
            name: 'Comfortable Sneakers',
            description: 'Lightweight and durable sneakers for everyday use.',
            colors: [
                {
                    colorName: 'White',
                    sizes: [
                        { name: '8', available: true },
                        { name: '9', available: false },
                        { name: '10', available: true }
                    ],
                    photos: ['white-sneakers-1.jpg', 'white-sneakers-2.jpg']
                },
                {
                    colorName: 'Black',
                    sizes: [
                        { name: '8', available: false },
                        { name: '9', available: true },
                        { name: '10', available: true }
                    ],
                    photos: ['black-sneakers-1.jpg', 'black-sneakers-2.jpg']
                }
            ],
            price: 80,
            discountedPrice: 70,
            nbrSold: 200,
            rating: 4.5,
            numberOfReviews: 250,
            brand: {
                name: 'Sneaker Co.',
                photoUrl: 'sneaker-co-logo.jpg'
            },
            gender: 'female',
            age: 'Adulte',
            category: 'Footwear',
            shippingCoast: 7
        },
        {
            id: '3',
            name: 'Classic Watch',
            description: 'An elegant watch suitable for formal occasions.',
            colors: [
                {
                    colorName: 'Gold',
                    sizes: [{ name: 'One Size', available: true }],
                    photos: ['gold-watch.jpg']
                }
            ],
            price: 200,
            discountedPrice: 180,
            nbrSold: 50,
            rating: 4.9,
            numberOfReviews: 120,
            brand: {
                name: 'Luxury Watches',
                photoUrl: 'luxury-watch-logo.jpg'
            },
            gender: 'male',
            age: 'Adulte',
            category: 'Accessories',
            shippingCoast: 10
        },
        {
            id: '4',
            name: 'Stylish Leather Jacket',
            description: 'A premium leather jacket for outdoor adventures.',
            colors: [
                {
                    colorName: 'Black',
                    sizes: [
                        { name: 'S', available: true },
                        { name: 'M', available: false },
                        { name: 'L', available: true }
                    ],
                    photos: ['black-jacket-1.jpg', 'black-jacket-2.jpg']
                }
            ],
            price: 300,
            discountedPrice: 250,
            nbrSold: 80,
            rating: 4.6,
            numberOfReviews: 100,
            brand: {
                name: 'Outdoorsy',
                photoUrl: 'outdoorsy-logo.jpg'
            },
            gender: 'male',
            age: 'Adulte',
            category: 'Jackets',
            shippingCoast: 15
        },
        {
            id: '5',
            name: 'Summer Dress',
            description: 'A light and breathable dress perfect for summer.',
            colors: [
                {
                    colorName: 'Yellow',
                    sizes: [
                        { name: 'XS', available: true },
                        { name: 'S', available: false },
                        { name: 'M', available: true }
                    ],
                    photos: ['yellow-dress.jpg']
                }
            ],
            price: 60,
            discountedPrice: 50,
            nbrSold: 150,
            rating: 4.7,
            numberOfReviews: 180,
            brand: {
                name: 'Elegant Wear',
                photoUrl: 'elegant-wear-logo.jpg'
            },
            gender: 'female',
            age: 'Adulte',
            category: 'Dresses',
            shippingCoast: 5
        },
        {
            id: '6',
            name: 'Kids’ Hoodie',
            description: 'A warm and cozy hoodie for kids.',
            colors: [
                {
                    colorName: 'Green',
                    sizes: [
                        { name: '2Y', available: true },
                        { name: '3Y', available: false },
                        { name: '4Y', available: true }
                    ],
                    photos: ['green-kids-hoodie.jpg']
                }
            ],
            price: 40,
            discountedPrice: 30,
            nbrSold: 90,
            rating: 4.3,
            numberOfReviews: 60,
            brand: {
                name: 'Kids Cozy',
                photoUrl: 'kids-cozy-logo.jpg'
            },
            gender: 'male',
            age: 'Kids',
            category: 'Hoodies',
            shippingCoast: 4
        },
        {
            id: '7',
            name: 'Running Shoes',
            description: 'High-performance shoes for running and training.',
            colors: [
                {
                    colorName: 'Blue',
                    sizes: [
                        { name: '9', available: true },
                        { name: '10', available: true },
                        { name: '11', available: false }
                    ],
                    photos: ['blue-running-shoes.jpg']
                }
            ],
            price: 120,
            discountedPrice: 100,
            nbrSold: 120,
            rating: 4.6,
            numberOfReviews: 200,
            brand: {
                name: 'Active Fit',
                photoUrl: 'active-fit-logo.jpg'
            },
            gender: 'male',
            age: 'Adulte',
            category: 'Footwear',
            shippingCoast: 8
        },
        {
            id: '8',
            name: 'Winter Boots',
            description: 'Durable boots for harsh winter conditions.',
            colors: [
                {
                    colorName: 'Brown',
                    sizes: [
                        { name: '8', available: true },
                        { name: '9', available: true },
                        { name: '10', available: false }
                    ],
                    photos: ['brown-winter-boots.jpg']
                }
            ],
            price: 150,
            discountedPrice: 130,
            nbrSold: 70,
            rating: 4.8,
            numberOfReviews: 140,
            brand: {
                name: 'Winter Gear',
                photoUrl: 'winter-gear-logo.jpg'
            },
            gender: 'female',
            age: 'Adulte',
            category: 'Footwear',
            shippingCoast: 10
        },
        {
            id: '9',
            name: 'Travel Backpack',
            description: 'A spacious and durable backpack for travel.',
            colors: [
                {
                    colorName: 'Gray',
                    sizes: [
                        { name: 'One Size', available: true }
                    ],
                    photos: ['gray-backpack.jpg']
                }
            ],
            price: 80,
            discountedPrice: 70,
            nbrSold: 60,
            rating: 4.4,
            numberOfReviews: 90,
            brand: {
                name: 'Travel Pro',
                photoUrl: 'travel-pro-logo.jpg'
            },
            gender: 'male',
            age: 'Adulte',
            category: 'Accessories',
            shippingCoast: 6
        },
        {
            id: '10',
            name: 'Kids’ T-shirt',
            description: 'A soft and comfortable t-shirt for kids.',
            colors: [
                {
                    colorName: 'Red',
                    sizes: [
                        { name: 'XS', available: true },
                        { name: 'S', available: false },
                        { name: 'M', available: true }
                    ],
                    photos: ['red-kids-tshirt.jpg']
                }
            ],
            price: 25,
            discountedPrice: 20,
            nbrSold: 100,
            rating: 4.5,
            numberOfReviews: 110,
            brand: {
                name: 'Kids Fun',
                photoUrl: 'kids-fun-logo.jpg'
            },
            gender: 'female',
            age: 'Kids',
            category: 'T-shirts',
            shippingCoast: 3
        }
    ];

    beforeEach(() => {

        activatedRouteMock = {
            queryParamMap: of(convertToParamMap({})) // Mock with convertToParamMap
        };

        TestBed.configureTestingModule({
            declarations: [ItemListComponent],
            imports: [HttpClientTestingModule, NgxSkeletonLoaderModule, NgbRatingModule, RouterModule],
            providers: [ItemService, { provide: ActivatedRoute, useValue: activatedRouteMock },
                { provide: NgbModal, useValue: modalServiceMock }]
        })

    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemListComponent);
        itemListComponent = fixture.debugElement.componentInstance;
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('Should fetch items from ItemService and display them in the template', () => {
        activatedRouteMock.queryParamMap = of(convertToParamMap({ gender: 'male', age: 'adult' }));
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('#skeletonsContainer')).toBeTruthy();
        expect(fixture.nativeElement.querySelector('#itemsContainer')).toBeFalsy();

        const req = httpMock.expectOne(SERVER_URL + "/items?gender=male&age=adult");
        expect(req.request.method).toBe('GET');
        req.flush(mockItems);
        expect(itemListComponent.items.length).toBe(10);

        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('#itemsContainer')).toBeTruthy();
        expect(fixture.nativeElement.querySelector('#skeletonsContainer')).toBeFalsy();

        const items = fixture.nativeElement.querySelectorAll('#item');
        expect(items.length).toBe(mockItems.length);
        expect(items[0].textContent).toContain(mockItems[0].name);
    });

})