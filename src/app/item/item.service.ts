import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IItem } from "./item.model";
import { HttpClient, HttpParams } from "@angular/common/http";
import { SERVER_URL } from "../app.constants";


@Injectable({ providedIn: 'root' })
export class ItemService {

    constructor(private httpClient: HttpClient) { }


    getItems(): Observable<IItem[]> {
        return this.httpClient.get<IItem[]>(SERVER_URL + "/items");
    }

    find(id: string): Observable<IItem> {
        return this.httpClient.get<IItem>(SERVER_URL + "/items/" + id);
    }

    getItemsOfGenderAge(gender_: string | null, age_: string | null): Observable<IItem[]> {
        let params = new HttpParams();

        if (gender_ !== null && gender_ !== undefined) {
            params = params.append('gender', gender_);
        }
        if (age_ !== null && age_ !== undefined) {
            params = params.append('age', age_);
        }
        return this.httpClient.get<IItem[]>(SERVER_URL + "/items", { params });
    }

    searchItems(searchText: string): Observable<IItem[]> {
        //I filtered the items manually since the json-server don't have a filtering option
        return this.httpClient.get<IItem[]>(SERVER_URL + "/items/search/" + searchText);
    }

    getSimilarItemsOfItem(item: IItem): Observable<IItem[]> {
        const params = { gender: item.gender, age: item.age, _page: 1, _limit: 5 };
        return this.httpClient.get<IItem[]>(SERVER_URL + "/items", { params });
    }
}