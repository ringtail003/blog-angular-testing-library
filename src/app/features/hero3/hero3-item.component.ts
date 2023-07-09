import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hero } from 'src/app/models/hero.model';

@Component({
  standalone: true,
  selector: 'app-hero3-item',
  imports: [],
  template: `
    <li>
      <span>{{ hero.name }}</span>
      <button (click)="remove.emit(hero)">削除</button>
    </li>
  `
})
export class Hero3ItemComponent {
  @Input({ required: true }) hero!: Hero;
  @Output() remove = new EventEmitter<Hero>();
}
