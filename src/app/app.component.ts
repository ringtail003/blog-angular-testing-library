import { Component } from '@angular/core';
import { Heros1Component } from 'src/app/features/heros1/heros.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [Heros1Component],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'blog-angular-testing-library';
}
