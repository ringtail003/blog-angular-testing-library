import { Injectable, signal } from "@angular/core";
import { toObservable } from '@angular/core/rxjs-interop';
import { Observable } from "rxjs";
import { Hero } from "src/app/models/hero.model";

@Injectable({
  providedIn: "root"
})
export class Heros1Service {
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
