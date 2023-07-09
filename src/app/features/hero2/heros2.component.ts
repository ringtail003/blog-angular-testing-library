import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Hero } from 'src/app/models/hero.model';
import { Hero2Service } from 'src/app/features/hero2/hero2.service';

@Component({
  standalone: true,
  selector: 'app-heros2',
  imports: [RouterModule, CommonModule],
  template: `
    <ul *ngFor="let hero of heros">
      <li>
        <span>{{ hero.name }}</span>
        <button (click)="remove(hero)">削除</button>
      </li>
    </ul>

    <label>
      <input type="text" placeholder="ヒーローの名前" #newHeroName>
    </label>
    <button (click)="add(newHeroName.value)">追加</button>
  `
})
export class Heros2Component implements OnInit {
  private readonly service = inject(Hero2Service);
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
