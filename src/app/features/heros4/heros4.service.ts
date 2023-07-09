import { Injectable, signal } from "@angular/core";
import { Observable } from "rxjs";
import { Hero } from "src/app/models/hero.model";
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: "root"
})
export class Hero4Service {
  private readonly heros = signal<Hero[]>([]);

  get heros$(): Observable<Hero[]> {
    return toObservable(this.heros);
  }

  fetch(): void {
    this.heros.update(() => [
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
    this.heros.update((heros) => {
      return [
        ...heros,
        { 
          id: this.heros().length + 1,
          name: newHeroName,
        },
      ]
    });
  }

  remove(hero: Hero): void {
    this.heros.update((heros) => {
      return heros.filter(v => v.id !== hero.id);
    })
  }
}
