import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { IOrder, Order } from "./order.model";
import { Observable } from "rxjs";
import { JSON_SERVER_URL } from "../app.constants";


@Injectable({ providedIn: 'root' })
export class OrderService {

    private httpClient: HttpClient = inject(HttpClient);

    public saveNewOrder(newOrder: Order): Observable<Order> {
        return this.httpClient.post<Order>(JSON_SERVER_URL + "/orders", newOrder)
    }

    public getAllOrders(): Observable<Order[]> {
        return this.httpClient.get<Order[]>(JSON_SERVER_URL + "/orders");
    }

    getOrders(status_: string, period: string): Observable<IOrder[]> {
        status_ = (status_ == 'all' ? '' : status_);
        let currentDate: Date = new Date();
        let fromDate: Date | null = new Date();

        switch (period) {
            case 'lastMonth': fromDate.setDate(currentDate.getDate() - 30); break;
            case 'lastSixMonth': fromDate.setMonth(currentDate.getMonth() - 6); break;
            case 'lastYear': fromDate.setFullYear(currentDate.getFullYear() - 1); break;
            case 'all': fromDate = null;
        }

        const params = { status: status_ };

        return this.httpClient.get<IOrder[]>(JSON_SERVER_URL + "/orders?", { params });
    }
}