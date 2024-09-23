

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemListComponent } from './item-list.component';
import { ItemModule } from '../item.module'; // Import the module where the component is declared
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ItemService } from '../items.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subject } from 'rxjs';
import { IItem } from '../item.model';

describe('ItemListComponent', () => {
    let component: ItemListComponent;
    let fixture: ComponentFixture<ItemListComponent>;
    let itemServiceMock: any;
    let modalServiceMock: any;
    let activatedRouteMock: any;
    let queryParamMapSubject: Subject<any>;

    beforeEach(async () => {
        itemServiceMock = {
            getItems: jasmine.createSpy('getItems').and.returnValue(of([])),
            getItemsOfGenderAge: jasmine.createSpy('getItemsOfGenderAge').and.returnValue(of([{
                id: 1,
                name: 'Item 1',
                description: 'Description 1',
                colors: [],
                price: 100,
                discountedPrice: 80,
                nbrSold: 10,
                rating: 4.5,
                numberOfReviews: 20,
                brand: undefined,
                gender: 'male',
                age: 'Adulte',
                category: 'Category 1',
                shippingCoast: 5
            },
            {
                id: 2,
                name: 'Item 2',
                description: 'Description 2',
                colors: [],
                price: 120,
                discountedPrice: 90,
                nbrSold: 15,
                rating: 4.7,
                numberOfReviews: 25,
                brand: undefined,
                gender: 'male',
                age: 'Adulte',
                category: 'Category 2',
                shippingCoast: 7
            }])),
            searchItems: jasmine.createSpy('searchItems').and.returnValue(of([
                {
                    id: 1,
                    name: 'Shoes 1',
                    description: 'Description 1',
                    colors: [],
                    price: 100,
                    discountedPrice: 80,
                    nbrSold: 10,
                    rating: 4.5,
                    numberOfReviews: 20,
                    brand: undefined,
                    gender: 'male',
                    age: 'Adulte',
                    category: 'Category 1',
                    shippingCoast: 5
                },
                {
                    id: 2,
                    name: 'Shoes 2',
                    description: 'Description 2',
                    colors: [],
                    price: 120,
                    discountedPrice: 90,
                    nbrSold: 15,
                    rating: 4.7,
                    numberOfReviews: 25,
                    brand: undefined,
                    gender: 'male',
                    age: 'Adulte',
                    category: 'Category 2',
                    shippingCoast: 7
                }
            ]))
        };

        modalServiceMock = {
            open: jasmine.createSpy('open').and.returnValue({
                componentInstance: {}
            })
        };

        queryParamMapSubject = new Subject();

        activatedRouteMock = {
            queryParamMap: queryParamMapSubject.asObservable()
        };

        await TestBed.configureTestingModule({
            imports: [
                ItemModule, // Import the module where the component is declared
                HttpClientTestingModule,
                RouterTestingModule
            ],
            providers: [
                { provide: ItemService, useValue: itemServiceMock },
                { provide: ActivatedRoute, useValue: activatedRouteMock },
                { provide: NgbModal, useValue: modalServiceMock }
            ],
            schemas: [NO_ERRORS_SCHEMA]  // Ignore unrecognized elements and attributes
        }).overrideTemplate(ItemListComponent, '')
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should subscribe to queryParamMap and update items based on params', () => {
        const gender = 'male';
        const age = 'Adulte';

        queryParamMapSubject.next({
            get: (key: string) => {
                if (key === 'gender') return gender;
                if (key === 'age') return age;
                return null;
            }
        });

        const expectedItems: IItem[] = [
            {
                id: 1,
                name: 'Item 1',
                description: 'Description 1',
                colors: [],
                price: 100,
                discountedPrice: 80,
                nbrSold: 10,
                rating: 4.5,
                numberOfReviews: 20,
                brand: undefined,
                gender: 'male',
                age: 'Adulte',
                category: 'Category 1',
                shippingCoast: 5
            },
            {
                id: 2,
                name: 'Item 2',
                description: 'Description 2',
                colors: [],
                price: 120,
                discountedPrice: 90,
                nbrSold: 15,
                rating: 4.7,
                numberOfReviews: 25,
                brand: undefined,
                gender: 'male',
                age: 'Adulte',
                category: 'Category 2',
                shippingCoast: 7
            }
        ];

        fixture.detectChanges();

        expect(itemServiceMock.getItemsOfGenderAge).toHaveBeenCalledWith(gender, age);
        expect(component.items).toEqual(expectedItems);
    });

    it('should update items when search query param changes', () => {
        const search = 'test';
        queryParamMapSubject.next({
            get: (key: string) => (key === 'search' ? search : null)
        });
        const expectedItems: IItem[] = [
            {
                id: 1,
                name: 'Shoes 1',
                description: 'Description 1',
                colors: [],
                price: 100,
                discountedPrice: 80,
                nbrSold: 10,
                rating: 4.5,
                numberOfReviews: 20,
                brand: undefined,
                gender: 'male',
                age: 'Adulte',
                category: 'Category 1',
                shippingCoast: 5
            },
            {
                id: 2,
                name: 'Shoes 2',
                description: 'Description 2',
                colors: [],
                price: 120,
                discountedPrice: 90,
                nbrSold: 15,
                rating: 4.7,
                numberOfReviews: 25,
                brand: undefined,
                gender: 'male',
                age: 'Adulte',
                category: 'Category 2',
                shippingCoast: 7
            }
        ];

        fixture.detectChanges();

        expect(itemServiceMock.searchItems).toHaveBeenCalledWith(search);
        expect(component.items).toEqual(expectedItems);
    });
});
