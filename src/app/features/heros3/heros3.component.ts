import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Hero } from 'src/app/models/hero.model';
import { Heros3ItemComponent } from 'src/app/features/heros3/heros3-item.component';
import { Heros3Service } from 'src/app/features/heros3/heros3.service';

@Component({
  standalone: true,
  selector: 'app-heros3',
  imports: [
    CommonModule,
    Heros3ItemComponent,
  ],
  template: `
    <ul *ngFor="let hero of heros">
      <app-heros3-item [hero]="hero" (remove)="onRemove($event)"></app-heros3-item>
    </ul>

    <input type="text" placeholder="ヒーローの名前" #newHeroName>
    <button (click)="add(newHeroName.value)">追加</button>
  `
})
export class Heros3Component implements OnInit {
  private readonly api = inject(Heros3Service);
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
