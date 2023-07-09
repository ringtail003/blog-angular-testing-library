import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Hero } from 'src/app/models/hero.model';
import { Hero3ItemComponent } from 'src/app/features/hero3/hero3-item.component';
import { Hero3ApiService } from 'src/app/features/hero3/hero3-api.service';

@Component({
  standalone: true,
  selector: 'app-heros3',
  imports: [
    CommonModule,
    Hero3ItemComponent,
  ],
  template: `
    <ul *ngFor="let hero of heros">
      <app-hero3-item [hero]="hero" (remove)="onRemove($event)"></app-hero3-item>
    </ul>

    <label>
      <input type="text" placeholder="ヒーローの名前" #newHeroName>
    </label>

    <button (click)="add(newHeroName.value)">追加</button>
  `
})
export class Heros3Component implements OnInit {
  private readonly api = inject(Hero3ApiService);
  heros: Hero[] = [];

  ngOnInit(): void {
    this.api.fetch().subscribe((heros) => {
      this.heros = heros;
    });
  }

  add(newHeroName: string): void {
    this.api.add(newHeroName).subscribe((createdHero) => {
      this.heros = [
        ...this.heros,
        createdHero,
      ];
    });
  }

  onRemove(hero: Hero): void {
    this.api.remove(hero).subscribe(() => {
      this.heros = this.heros.filter(v => v.id !== hero.id);
    });
  }
}
