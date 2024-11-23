import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, Router } from "@angular/router";
import { IItem } from "../item.model";
import { Observable } from "rxjs/internal/Observable";
import { EMPTY, mergeMap, of } from "rxjs";
import { ItemService } from "../item.service";



const itemResolve = (route: ActivatedRouteSnapshot): Observable<null | IItem> => {
    const id = route.queryParams['id'];
    
    if (id) {
        return inject(ItemService)
          .find(id)
          .pipe(
            mergeMap((item: IItem) => {
              if (item) {
                return of(item);
              } else {
                inject(Router).navigate(['404']);
                return EMPTY;
              }
            }),
          );
      }
      return of(null);
}

export default itemResolve;