import { TestBed } from "@angular/core/testing";
import { fireEvent, render, screen, waitFor } from "@testing-library/angular";
import { BehaviorSubject } from "rxjs";
import { Hero1Service } from "src/app/features/heros1/hero1.service";
import { Heros1Component } from "src/app/features/heros1/heros1.component";
import { Hero } from "src/app/models/hero.model";

describe("components.Heros1Component", () => {
  describe("ヒーローを追加し削除する", () => {
    beforeEach(async () => {
      await render(`<app-heros></app-heros>`, {
        imports: [Heros1Component],
        providers: [
          {
            provide: Hero1Service,
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
