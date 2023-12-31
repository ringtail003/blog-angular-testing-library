import { fireEvent, render, screen } from "@testing-library/angular";
import { Observable, of } from "rxjs";
import { Heros2Component } from "src/app/features/heros2/heros2.component";
import { Heros2Service } from "src/app/features/heros2/heros2.service";
import { Hero } from "src/app/models/hero.model";

describe("components.Heros2Component", () => {
  it("ヒーローを追加し削除する", async () => {
    await render(`<app-heros2></app-heros2>`, {
      imports: [Heros2Component],
      providers: [
        {
          provide: Heros2Service,
          useClass: MockService,
        }
      ]
    });

    expect(screen.getByText("Hero1")).toBeTruthy();

    fireEvent.input(screen.getByPlaceholderText("ヒーローの名前"), { target: { value: "New Hero" } })
    fireEvent.click(screen.getByRole("button", { name: "追加" }));
    expect(screen.getByText("New Hero")).toBeTruthy();

    fireEvent.click(screen.getAllByRole("button", { name: "削除" })[0]);
    expect(screen.queryByText("Hero1")).toBeNull();
  });
});

class MockService {
  fetch(): Observable<Hero[]> {
    return of([
      { id: 1, name: "Hero1" },
    ]);
  }

  add(name: string): Observable<Hero> {
    return of({ id: 2, name });
  }

  remove(): Observable<null> {
    return of(null);
  }
}
