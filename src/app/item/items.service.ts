import { Injectable, inject } from "@angular/core";
import { Observable, map, of } from "rxjs";
import { IItem } from "./item.model";
import { HttpClient, HttpParams } from "@angular/common/http";
import { JSON_SERVER_URL } from "../app.constants";


@Injectable({ providedIn: 'root' })
export class ItemService {

    constructor(private httpClient: HttpClient) { }


    getItems(): Observable<IItem[]> {
        return this.httpClient.get<IItem[]>(JSON_SERVER_URL + "/items");
    }

    find(id: number): Observable<IItem> {
        return this.httpClient.get<IItem>(JSON_SERVER_URL + "/items/" + id);
    }

    getItemsOfGenderAge(gender_: string | null, age_: string | null): Observable<IItem[]> {
        let params = new HttpParams();

        if (gender_ !== null && gender_ !== undefined) {
            params = params.append('gender', gender_);
        }
        if (age_ !== null && age_ !== undefined) {
            params = params.append('age', age_);
        }
        return this.httpClient.get<IItem[]>(JSON_SERVER_URL + "/items", { params });
    }

    searchItems(search: string): Observable<IItem[]> {
        //I filtered the items manually since the json-server don't have a filtering option
        return this.httpClient.get<IItem[]>(JSON_SERVER_URL + "/items").pipe(map(items => items.filter(item => item.name.includes(search))));
    }

    getSimilarItemsOfItem(item: IItem): Observable<IItem[]> {
        const params = { gender: item.gender, age: item.age, _page: 1, _limit: 5 };
        return this.httpClient.get<IItem[]>(JSON_SERVER_URL + "/items", { params });
    }
}