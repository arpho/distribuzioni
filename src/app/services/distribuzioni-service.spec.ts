import { TestBed } from "@angular/core/testing";

import { DistribuzioniService } from "./distribuzioni-service";

describe("DistribuzioniServiceService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: DistribuzioniService = TestBed.get(DistribuzioniService);
    expect(service).toBeTruthy();
  });
});
