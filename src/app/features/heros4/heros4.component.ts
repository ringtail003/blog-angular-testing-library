import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Hero } from 'src/app/models/hero.model';
import { Hero4Service } from 'src/app/features/heros4/heros4.service';

@Component({
  standalone: true,
  selector: 'app-heros4',
  imports: [CommonModule],
  template: `
    <table *ngFor="let hero of heros">
      <tbody>
        <tr>
          <td>{{ hero.name }}</td>
          <td><button (click)="remove(hero)">削除</button></td>
        </tr>
      </tbody>
    </table>

    <div>
      <div>
        <input type="text" placeholder="ヒーローの名前" #newHeroName>
      </div>
    </div>

    <div>
      <button (click)="add(newHeroName.value)">追加</button>
    </div>
  `
})
export class Heros4Component implements OnInit {
  private readonly service = inject(Hero4Service);
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
