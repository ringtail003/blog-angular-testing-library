import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Hero } from 'src/app/models/hero.model';
import { Hero1Service } from 'src/app/features/heros1/heros1.service';

@Component({
  standalone: true,
  selector: 'app-heros1',
  imports: [CommonModule],
  template: `
    <ul *ngFor="let hero of heros">
      <li>
        <span>{{ hero.name }}</span>
        <button (click)="remove(hero)">削除</button>
      </li>
    </ul>

    <input type="text" placeholder="ヒーローの名前" #newHeroName>
    <button (click)="add(newHeroName.value)">追加</button>
  `
})
export class Heros1Component implements OnInit {
  private readonly service = inject(Hero1Service);
  heros: Hero[] = [];

  constructor() {
    this.service.heros$.subscribe(heros => this.heros = heros);
  }

  ngOnInit(): void {
    this.service.fetch();
  }

  add(newHeroName: string): void {
    this.service.add(newHeroName);
  }

  remove(hero: Hero): void {
    this.service.remove(hero);
  }
}
