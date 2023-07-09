import { Component } from '@angular/core';
import { Heros1Component } from 'src/app/features/heros1/heros1.component';
import { Heros2Component } from 'src/app/features/heros2/heros2.component';
import { Heros3Component } from 'src/app/features/heros3/heros3.component';
import { Heros4Component } from 'src/app/features/heros4/heros4.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    Heros1Component,
    Heros2Component,
    Heros3Component,
    Heros4Component,
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
}
