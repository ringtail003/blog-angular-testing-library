import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Hero } from "src/app/models/hero.model";

@Injectable({
  providedIn: "root"
})
export class Heros2Service {
  fetch(): Observable<Hero[]> {
    return of([
      {
        id: 1, 
        name: "Dr. Nice",
      },
      {
        id: 2, 
        name: "Bombasto",
      },
      {
        id: 3, 
        name: "Celeritas",
      }
    ]);
  }

  add(name: string): Observable<Hero> {
    return of({
      id: 100,
      name
    });
  }

  remove(hero: Hero): Observable<void> {
    return of();
  }
}
