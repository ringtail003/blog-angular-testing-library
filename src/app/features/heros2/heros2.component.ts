import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Heros2Service } from 'src/app/features/heros2/heros2.service';
import { Hero } from 'src/app/models/hero.model';

@Component({
  standalone: true,
  selector: 'app-heros2',
  imports: [CommonModule],
  template: `
    <ul *ngFor="let hero of heros">
      <li>
        <span>{{ hero.name }}</span>
        <button (click)="onRemove(hero)">削除</button>
      </li>
    </ul>

    <input type="text" placeholder="ヒーローの名前" #newHeroName>
    <button (click)="add(newHeroName.value)">追加</button>
  `
})
export class Heros2Component implements OnInit {
  private readonly service = inject(Heros2Service);
  heros: Hero[] = [];

  ngOnInit(): void {
    this.service.fetch().subscribe(heros => this.heros = heros);
  }

  add(newHeroName: string): void {
    this.service.add(newHeroName).subscribe((hero) => {
      this.heros = [
        ...this.heros,
        hero,
      ];
    });
  }

  onRemove(hero: Hero): void {
    this.service.remove(hero).subscribe(() => {
      this.heros = this.heros.filter(v => v.id !== hero.id);
    });
  }
}
