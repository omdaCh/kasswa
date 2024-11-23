import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { OrderService } from './order.service';
import { IOrder, Order } from './order.model';
import { SERVER_URL } from '../app.constants';

describe('Order service', () => {
    let orderService: OrderService;
    let httpMock: HttpTestingController;

    const mockOrders: IOrder[] = [
        {
            id: 1,
            date: new Date('2024-09-01'),
            status: 'completed',
            orderItems: [
                {
                    id: '101',
                    orderId: 1,
                    itemId: '1',
                    itemName: 'Blue T-Shirt',
                    color: 'Blue',
                    colorPhotoUrl: 'https://example.com/blue-tshirt.jpg',
                    size: 'M',
                    quantity: 2,
                    price: 25,
                    totalPrice: 50,
                    shippingCoast: 5,
                    totalShipping: 10
                },
                {
                    id: '102',
                    orderId: 1,
                    itemId: '2',
                    itemName: 'Red Shoes',
                    color: 'Red',
                    colorPhotoUrl: 'https://example.com/red-shoes.jpg',
                    size: '42',
                    quantity: 1,
                    price: 75,
                    totalPrice: 75,
                    shippingCoast: 10,
                    totalShipping: 10
                }
            ],
            subTotal: 125,
            totalShipping: 20,
            totalQuantity: 3,
            totalPrice: 145
        },
        {
            id: 2,
            date: new Date('2024-09-05'),
            status: 'shipped',
            orderItems: [
                {
                    id: '103',
                    orderId: 2,
                    itemId: '3',
                    itemName: 'Green Jacket',
                    color: 'Green',
                    colorPhotoUrl: 'https://example.com/green-jacket.jpg',
                    size: 'L',
                    quantity: 1,
                    price: 100,
                    totalPrice: 100,
                    shippingCoast: 15,
                    totalShipping: 15
                }
            ],
            subTotal: 100,
            totalShipping: 15,
            totalQuantity: 1,
            totalPrice: 115
        },
        {
            id: 3,
            date: new Date('2024-04-10'),
            status: 'pending',
            orderItems: [
                {
                    id: '104',
                    orderId: 3,
                    itemId: '4',
                    itemName: 'Yellow Hat',
                    color: 'Yellow',
                    colorPhotoUrl: 'https://example.com/yellow-hat.jpg',
                    size: 'One Size',
                    quantity: 3,
                    price: 20,
                    totalPrice: 60,
                    shippingCoast: 5,
                    totalShipping: 15
                }
            ],
            subTotal: 60,
            totalShipping: 15,
            totalQuantity: 3,
            totalPrice: 75
        },
        {
            id: 4,
            date: new Date('2024-01-15'),
            status: 'cancelled',
            orderItems: [
                {
                    id: '105',
                    orderId: 4,
                    itemId: '5',
                    itemName: 'Black Jeans',
                    color: 'Black',
                    colorPhotoUrl: 'https://example.com/black-jeans.jpg',
                    size: '32',
                    quantity: 2,
                    price: 50,
                    totalPrice: 100,
                    shippingCoast: 8,
                    totalShipping: 16
                }
            ],
            subTotal: 100,
            totalShipping: 16,
            totalQuantity: 2,
            totalPrice: 116
        },
        {
            id: 5,
            date: new Date('2024-01-20'),
            status: 'completed',
            orderItems: [
                {
                    id: '106',
                    orderId: 5,
                    itemId: '6',
                    itemName: 'White Sneakers',
                    color: 'White',
                    colorPhotoUrl: 'https://example.com/white-sneakers.jpg',
                    size: '40',
                    quantity: 1,
                    price: 80,
                    totalPrice: 80,
                    shippingCoast: 12,
                    totalShipping: 12
                }
            ],
            subTotal: 80,
            totalShipping: 12,
            totalQuantity: 1,
            totalPrice: 92
        }
    ];

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [OrderService]
        });

        orderService = TestBed.inject(OrderService);
        httpMock = TestBed.inject(HttpTestingController);

    });

    afterEach(() => {
        httpMock.verify();
    });


    it('Should fetch all orders', () => {

        orderService.getAllOrders().subscribe(orders => {
            expect(orders.length).toBe(5);
        });

        const req = httpMock.expectOne(SERVER_URL + "/orders");
        expect(req.request.method).toBe('GET');
        req.flush(mockOrders);
    });

    it('should fetch orders with correct status and period (lastMonth)', () => {

        orderService.getOrders('completed', 'lastMonth').subscribe((orders) => {
            expect(orders).toEqual(mockOrders);
        });

        const req = httpMock.expectOne((request) =>
            request.url === `${SERVER_URL}/orders` &&
            request.params.get('status') === 'completed' &&
            request.params.get('period') === 'lastMonth'
        );

        expect(req.request.method).toBe('GET');

        req.flush(mockOrders); // Provide the mock data as a response
    });

    it('should send a POST request to save a new order', () => {
        // Mock order to send
        const mockNewOrder: IOrder = new Order(
            'pending',
            [
                {
                    id: '101',
                    orderId: 1,
                    itemId: '1',
                    itemName: 'Blue T-Shirt',
                    color: 'Blue',
                    colorPhotoUrl: 'https://example.com/blue-tshirt.jpg',
                    size: 'M',
                    quantity: 2,
                    price: 25,
                    totalPrice: 50,
                    shippingCoast: 5,
                    totalShipping: 10
                }
            ],
            50,   // subTotal
            10,   // totalShipping
            2,    // totalQuantity
            60,   // totalPrice
            1,    // id
            new Date() // date
        );

        orderService.saveNewOrder(mockNewOrder).subscribe(orderSaved=>{
            expect(orderSaved).toBe(mockNewOrder);
        });

        const req = httpMock.expectOne(SERVER_URL + "/orders/newOrder");



        expect(req.request.method).toBe('POST');

        expect(req.request.body).toBe(mockNewOrder);

        req.flush(mockNewOrder);


    });
})


