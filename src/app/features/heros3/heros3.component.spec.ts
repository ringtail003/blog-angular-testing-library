import { fireEvent, render, screen, waitFor } from "@testing-library/angular";
import { Observable, of } from "rxjs";
import { Heros3Service } from "src/app/features/heros3/heros3.service";
import { Heros3Component } from "src/app/features/heros3/heros3.component";
import { Hero } from "src/app/models/hero.model";

describe("components.Heros3Component", () => {
  it("ヒーローを追加し削除する", async () => {
    await render(`<app-heros3></app-heros3>`, {
      imports: [Heros3Component],
      providers: [
        {
          provide: Heros3Service,
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
