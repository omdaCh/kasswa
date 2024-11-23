import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ItemDetailComponent } from "./item-detail.component"
import { ItemService } from "../item.service";
import { CartService } from "../../cart/cart.service";
import { ActivatedRoute, convertToParamMap, RouterModule } from "@angular/router";
import { of, Subject } from "rxjs";
import { IItem } from "../item.model";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { NgbCarouselModule, NgbModal, NgbRatingModule } from "@ng-bootstrap/ng-bootstrap";
import { ItemAboutAddingToCartComponent } from "../item-about-adding-to-cart/item-about-adding-to-cart.component";



describe('Item detail component', () => {

    let itemDetailComponent: ItemDetailComponent;
    let fixture: ComponentFixture<ItemDetailComponent>;
    let activatedRouteMock: Partial<ActivatedRoute>;
    let itemServiceMock: jasmine.SpyObj<ItemService>;
    let cartServiceMock: jasmine.SpyObj<CartService>;
    let modalServiceMock: jasmine.SpyObj<NgbModal>;

    const itemMock: IItem = {
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
    };

    const similarItemsMock: IItem[] = [

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
        }
    ];


    beforeEach(async () => {
        itemServiceMock = jasmine.createSpyObj('ItemService', ['find', 'getSimilarItemsOfItem']);
        cartServiceMock = jasmine.createSpyObj('CartService', ['addItem']);
        modalServiceMock = jasmine.createSpyObj('NgbModal', ['open']);


        activatedRouteMock = {
            queryParamMap: of(convertToParamMap({ id: '1' }))
        };

        await TestBed.configureTestingModule({
            declarations: [ItemDetailComponent],
            providers: [{ provide: ItemService, useValue: itemServiceMock },
            { provide: ActivatedRoute, useValue: activatedRouteMock },
            { provide: CartService, useValue: cartServiceMock },
            { provide: NgbModal, useValue: modalServiceMock }
            ],
            imports: [NgxSkeletonLoaderModule, NgbCarouselModule, NgbRatingModule, RouterModule]

        }).compileComponents();

    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemDetailComponent);
        itemDetailComponent = fixture.debugElement.componentInstance;
    })

    it('Should create the component', () => {
        expect(itemDetailComponent).toBeTruthy();
    });

    it('Should load item and similar items', () => {

        itemServiceMock.find.and.returnValue(of(itemMock));
        itemServiceMock.getSimilarItemsOfItem.and.returnValue(of(similarItemsMock));
        fixture.detectChanges();
        expect(itemDetailComponent.item).toEqual(itemMock);
        expect(itemDetailComponent.similairItems).toEqual(similarItemsMock);
    });

    it('Should set itemIsLoading to true when loading item', () => {
        const itemSubject = new Subject<IItem>();
        itemServiceMock.find.and.returnValue(itemSubject);
        expect(itemDetailComponent.itemIsLoading).toBeFalse();

        fixture.detectChanges();
        expect(itemDetailComponent.itemIsLoading).toBeTrue();
        itemSubject.next(itemMock);
        expect(itemDetailComponent.itemIsLoading).toBeFalse();
    });

    it('Should update colorSelected and selectedPhotoUrl when item fetched', () => {
        itemServiceMock.find.and.returnValue(of(itemMock));
        fixture.detectChanges();
        expect(itemDetailComponent.colorSelected).toEqual(itemMock.colors[0]);
        expect(itemDetailComponent.selectedPhotoUrl).toEqual(itemMock.colors[0].photos[0]);
    });

    it('Should scroll to top when loading', () => {
        fixture.detectChanges();
        expect(itemDetailComponent.mainContainer.nativeElement.scrollTop).toBe(0);
    });

    it('should call cartService.addItem when all inputs are set, otherwise not call', () => {

        const colorSelectedMock = itemMock.colors[0];
        const sizeSelectedMock = itemMock.colors[0].sizes[0];

        const testCases = [
            {
                description: 'should call addItem when all inputs are set',
                item: itemMock,
                colorSelected: colorSelectedMock,
                sizeSelected: sizeSelectedMock,
                expectedCall: true
            },
            {
                description: 'should not call addItem when item is null',
                item: undefined,
                colorSelected: colorSelectedMock,
                sizeSelected: sizeSelectedMock,
                expectedCall: false
            },
            {
                description: 'should not call addItem when colorSelected is null',
                item: itemMock,
                colorSelected: undefined,
                sizeSelected: sizeSelectedMock,
                expectedCall: false
            },
            {
                description: 'should not call addItem when sizeSelected is null',
                item: itemMock,
                colorSelected: colorSelectedMock,
                sizeSelected: undefined,
                expectedCall: false
            }
        ];

        testCases.forEach(testCase => {
            // Set component inputs based on the test case
            itemDetailComponent.item = testCase.item;
            itemDetailComponent.colorSelected = testCase.colorSelected;
            itemDetailComponent.sizeSelected = testCase.sizeSelected;

            // Clear any previous calls to cartService.addItem
            cartServiceMock.addItem.calls.reset();

            // Act
            itemDetailComponent.addToCart();

            // Assert
            if (testCase.expectedCall) {
                expect(cartServiceMock.addItem).toHaveBeenCalledWith(testCase.item!, testCase.colorSelected!.colorName, testCase.sizeSelected!.name, 1);
            } else {
                expect(cartServiceMock.addItem).not.toHaveBeenCalled();
            }
        });
    });


    it('Should open dialog when one of similar item is added to cart', () => {
        const modalRefMock = {
            componentInstance: { itemId: '' }, 
        };

        /* eslint-disable */
        modalServiceMock.open.and.returnValue(modalRefMock as any);

        itemDetailComponent.onSimilarItemAddToCartClick(itemMock);
        expect(modalServiceMock.open).toHaveBeenCalledWith(ItemAboutAddingToCartComponent,{ centered: true, windowClass: 'full-width-modal' });
        expect(modalRefMock.componentInstance.itemId).toEqual(itemMock.id);

    });

    

})