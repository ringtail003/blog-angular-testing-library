import { Injectable, signal } from "@angular/core";
import { Observable } from "rxjs";
import { Hero } from "src/app/features/heros1/heros.model";
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: "root"
})
export class HeroService {
  readonly heros = signal<Hero[]>([]);

  get heros$(): Observable<Hero[]> {
    return toObservable(this.heros);
  }

  fetch(): void {
    this.heros.update(() => [
      {
        id: 1, 
        name: "Dr. Nice",
        registeredAt: new Date("2022-02-11T11:42:30+0900"),
      },
      {
        id: 2, 
        name: "Bombasto",
        registeredAt: new Date("2022-03-08T15:11:30+0900"),
      },
      {
        id: 3, 
        name: "Celeritas",
        registeredAt: new Date("2022-03-08T15:11:30+0900"),
      }
    ]);
  }

  add(newHeroName: string): void {
    this.heros.update((heros) => {
      return heros.concat({ 
        id: this.heros().length + 1,
        name: newHeroName,
        registeredAt: new Date()
      });
    });
  }

  remove(hero: Hero): void {
    this.heros.update((heros) => {
      return heros.filter(v => v.id !== hero.id);
    })
  }
}
