import { fireEvent, render, screen } from "@testing-library/angular";
import { BehaviorSubject } from "rxjs";
import { Hero4Service } from "src/app/features/heros4/heros4.service";
import { Heros4Component } from "src/app/features/heros4/heros4.component";
import { Hero } from "src/app/models/hero.model";

describe("components.Heros4Component", () => {
  describe("ヒーローを追加し削除する", () => {
    beforeEach(async () => {
      await render(`<app-heros4></app-heros4>`, {
        imports: [Heros4Component],
        providers: [
          {
            provide: Hero4Service,
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

    it("削除", () => {
      fireEvent.click(screen.getByRole("button", { name: "削除" }));
      expect(screen.queryByText("Hero1")).toBeNull();
    });
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
