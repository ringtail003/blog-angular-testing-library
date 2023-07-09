import { fireEvent, render, screen, waitFor } from "@testing-library/angular";
import { Observable, of } from "rxjs";
import { Hero3ApiService } from "src/app/features/hero3/hero3-api.service";
import { Heros3Component } from "src/app/features/hero3/heros3.component";
import { Hero } from "src/app/models/hero.model";

describe("components.Heros3Component", () => {
  describe("ヒーローを追加し削除する", () => {
    beforeEach(async () => {
      await render(`<app-heros3></app-heros3>`, {
        imports: [Heros3Component],
        providers: [
          {
            provide: Hero3ApiService,
            useClass: MockService,
          }
        ]
      });
    });

    it("初期表示", () => {
      expect(screen.getByText("Hero1"));
    });

    it("追加", () => {
      fireEvent.input(screen.getByPlaceholderText("ヒーローの名前"), { target: { value: "New Hero" } })
      fireEvent.click(screen.getByRole("button", { name: "追加" }));
      expect(screen.getByText("Hero1"));
      expect(screen.getByText("New Hero"));
    });

    it("削除", async () => {
      fireEvent.click(screen.getByRole("button", { name: "削除" }));
      expect(screen.queryByText("Hero1")).toBeNull();
    });
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
