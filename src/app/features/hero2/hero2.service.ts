import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Hero } from "src/app/models/hero.model";

@Injectable({
  providedIn: "root"
})
export class Hero2Service {
  readonly heros$ = new BehaviorSubject<Hero[]>([]);

  fetch(): void {
    this.heros$.next([
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

  add(newHeroName: string): void {
    this.heros$.next([
      ...this.heros$.value,
      { 
        id: this.heros$.value.length + 1,
        name: newHeroName,
      }, 
    ]);
  }

  remove(hero: Hero): void {
    this.heros$.next(this.heros$.value.filter(v => v.id !== hero.id));
  }
}
