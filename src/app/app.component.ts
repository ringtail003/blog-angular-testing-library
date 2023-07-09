import { Component } from '@angular/core';
import { Heros1Component } from 'src/app/features/hero1/heros1.component';
import { Heros2Component } from 'src/app/features/hero2/heros2.component';
import { Heros3Component } from 'src/app/features/hero3/heros3.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    Heros1Component,
    Heros2Component,
    Heros3Component,
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
}
