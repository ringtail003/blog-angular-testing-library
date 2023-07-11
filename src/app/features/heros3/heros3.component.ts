import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Heros3ItemComponent } from 'src/app/features/heros3/heros3-item.component';
import { Heros3Service } from 'src/app/features/heros3/heros3.service';
import { Hero } from 'src/app/models/hero.model';

@Component({
  standalone: true,
  selector: 'app-heros3',
  imports: [
    CommonModule,
    Heros3ItemComponent,
  ],
  template: `
    <table>
      <tbody>
        <tr>
          <td>
            <app-heros3-item 
              *ngFor="let hero of heros" 
              [hero]="hero"
              (remove)="onRemove(hero)"
            ></app-heros3-item>
          </td>
        </tr>
      </tbody>
    </table>

    <input type="text" placeholder="ヒーローの名前" #newHeroName>
    <button (click)="add(newHeroName.value)">追加</button>
  `
})
export class Heros3Component implements OnInit {
  private readonly service = inject(Heros3Service);
  heros: Hero[] = [];

  ngOnInit(): void {
    this.service.fetch().subscribe((heros) => {
      this.heros = heros;
    });
  }

  add(newHeroName: string): void {
    this.service.add(newHeroName).subscribe((createdHero) => {
      this.heros = [
        ...this.heros,
        createdHero,
      ];
    });
  }

  onRemove(hero: Hero): void {
    this.service.remove(hero).subscribe(() => {
      this.heros = this.heros.filter(v => v.id !== hero.id);
    });
  }
}
