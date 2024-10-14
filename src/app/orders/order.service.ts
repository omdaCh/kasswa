import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { IOrder, Order } from "./order.model";
import { Observable } from "rxjs";
import { SERVER_URL } from "../app.constants";


@Injectable({ providedIn: 'root' })
export class OrderService {

    private httpClient: HttpClient = inject(HttpClient);

    public saveNewOrder(newOrder: Order): Observable<Order> {
        return this.httpClient.post<Order>(SERVER_URL + "/orders/newOrder", newOrder)
    }

    public getAllOrders(): Observable<Order[]> {
        return this.httpClient.get<Order[]>(SERVER_URL + "/orders");
    }

    getOrders(status_: string, period: string): Observable<IOrder[]> {
        const params = { status: status_, period: period };
        return this.httpClient.get<IOrder[]>(SERVER_URL + "/orders", { params });
    }
}