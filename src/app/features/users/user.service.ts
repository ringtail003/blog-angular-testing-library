import { Injectable, inject, signal } from "@angular/core";
import { Observable, of } from "rxjs";
import { User } from "src/app/features/users/user.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class UserService {
  readonly users = signal<User[]>([]);

  get users$(): Observable<User[]> {
    return of(this.users);
  }

  fetch(): void {
    this.users.update(() => [
      {
        id: 1, 
        name: "A",
        registeredAt: new Date("2022-02-11T11:42:30+0900"),
      },
      {
        id: 2, 
        name: "B",
        registeredAt: new Date("2022-03-08T15:11:30+0900"),
      }
    ]);
  }

  add(): void {
    this.users.update((list) => {
      return list.concat({ id: this.users.length, name: "", registeredAt: new Date() });
    });
  }
}
