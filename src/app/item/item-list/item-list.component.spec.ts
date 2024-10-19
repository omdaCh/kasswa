import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemListComponent } from './item-list.component'; // Adjust the path as necessary
import { ItemService } from '../item.service'; // Adjust the path as necessary
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subject } from 'rxjs';
import { IItem } from '../item.model';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ItemAboutAddingToCartComponent } from '../item-about-adding-to-cart/item-about-adding-to-cart.component';



describe('ItemListComponent', () => {
    let itemListComponent: ItemListComponent;
    let fixture: ComponentFixture<ItemListComponent>;
    let itemServiceMock: jasmine.SpyObj<ItemService>;
    let activatedRouteMock: any;
    let modalServiceMock: jasmine.SpyObj<NgbModal>;

    beforeEach(async () => {

        itemServiceMock = jasmine.createSpyObj('ItemService', ['getItemsOfGenderAge', 'searchItems', 'getItems']);
        activatedRouteMock = {
            queryParamMap: of(convertToParamMap({})) // Mock with convertToParamMap
        };
        modalServiceMock = jasmine.createSpyObj('NgbModal', ['open']);

        itemServiceMock.getItemsOfGenderAge.and.returnValue(of([]));
        itemServiceMock.searchItems.and.returnValue(of([]));
        itemServiceMock.getItems.and.returnValue(of([]));


        await TestBed.configureTestingModule({
            declarations: [ItemListComponent],
            imports: [NgxSkeletonLoaderModule],
            providers: [
                { provide: ItemService, useValue: itemServiceMock },
                { provide: ActivatedRoute, useValue: activatedRouteMock },
                { provide: NgbModal, useValue: modalServiceMock }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemListComponent);
        itemListComponent = fixture.debugElement.componentInstance;
    });

    it('Should create the component', () => {
        expect(itemListComponent).toBeTruthy();
    });

    it('should fetch items based on gender and age query parameters', () => {
        activatedRouteMock.queryParamMap = of(convertToParamMap({ gender: 'male', age: 'adult' }));
        fixture.detectChanges(); // Trigger ngOnInit
        expect(itemServiceMock.getItemsOfGenderAge).toHaveBeenCalledWith('male', 'adult');
    });

    it('should fetch items based on search query parameter', () => {
        activatedRouteMock.queryParamMap = of(convertToParamMap({ search: 'shoes' }));
        fixture.detectChanges(); // Trigger ngOnInit
        expect(itemServiceMock.searchItems).toHaveBeenCalledWith('shoes');
    });

    it('Should fetch all items when no query parameter are provided', () => {
        activatedRouteMock.queryParamMap = of(convertToParamMap({}));
        fixture.detectChanges();
        expect(itemServiceMock.getItems).toHaveBeenCalled();
    });

    it('should set itemsAreLoading to true while loading items and false after loading', () => {
        activatedRouteMock.queryParamMap = of(convertToParamMap({}));

        const itemsSubject = new Subject<IItem[]>();
        itemServiceMock.getItems.and.returnValue(itemsSubject.asObservable()); // Service returns the subject, so we can control the flow

        fixture.detectChanges();

        expect(itemListComponent.itemsAreLoading).toBeTrue();

        itemsSubject.next([]);

        expect(itemListComponent.itemsAreLoading).toBeFalse();
    });

    it('should open modal with correct item ID on add to cart click', () => {
        const item: IItem = {
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

        const event = new Event('click');
        spyOn(event, 'stopPropagation'); // Ensure stopPropagation is called

        const modalRefMock = {
            componentInstance: { itemId: '' }, // Initial empty object
        };

        modalServiceMock.open.and.returnValue(modalRefMock as any);

        itemListComponent.onAddToCartClick(event, item);

        expect(modalServiceMock.open).toHaveBeenCalledWith(ItemAboutAddingToCartComponent, { centered: true, windowClass: 'full-width-modal' });

        expect(modalRefMock.componentInstance.itemId).toBe(item.id);

        expect(event.stopPropagation).toHaveBeenCalled();
    });

    it('should scroll to top after loading items', () => { 
        fixture.detectChanges(); 
        expect(itemListComponent.mainContainer.nativeElement.scrollTop).toBe(0);
    });


});
