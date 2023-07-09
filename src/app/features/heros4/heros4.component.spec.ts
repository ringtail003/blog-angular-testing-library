import { fireEvent, render, screen } from "@testing-library/angular";
import { BehaviorSubject } from "rxjs";
import { Hero4Service } from "src/app/features/heros4/heros4.service";
import { Heros4Component } from "src/app/features/heros4/heros4.component";
import { Hero } from "src/app/models/hero.model";

describe("components.Heros4Component", () => {
  it("ヒーローを追加し削除する", async () => {
    await render(`<app-heros4></app-heros4>`, {
      imports: [Heros4Component],
      providers: [
        {
          provide: Hero4Service,
          useClass: MockService,
        }
      ]
    });

    expect(screen.getByText("Hero1"));

    fireEvent.input(screen.getByPlaceholderText("ヒーローの名前"), { target: { value: "New Hero" } })
    fireEvent.click(screen.getByRole("button", { name: "追加" }));
    expect(screen.getByText("New Hero"));

    fireEvent.click(screen.getAllByRole("button", { name: "削除" })[0]);
    expect(screen.queryByText("Hero1")).toBeNull();
  });
});

class MockService {
  heros$ = new BehaviorSubject<Hero[]>([]);

  fetch(): void {
    this.heros$.next([
      { id: 1, name: "Hero1" },
    ]);
  }

  add(name: string): void {
    this.heros$.next([
      { id: 1, name: "Hero1" },
      { id: 2, name },
    ]);
  }

  remove(): void {
    this.heros$.next([]);
  }
}
