import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from 'src/app/features/users/user.model';
import { UserService } from 'src/app/features/users/user.service';

@Component({
  standalone: true,
  selector: 'app-user-list',
  imports: [RouterModule],
  template: `
    <ul>
      <a *ngFor="let user of users" routerLink="'users/{{ user.id }}'">{{ user.name }}</a>
    </ul>

    <button (click)="add()">Add User</button>
  `
})
export class UsersComponent implements OnInit {
  private readonly service = inject(UserService);
  users: User[] = [];

  ngOnInit(): void {
    this.service.users$.subscribe(uses => this.users = this.users);
    this.service.fetch();
  }

  add() {
    this.service.add();
  }
}
