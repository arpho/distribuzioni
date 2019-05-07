import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { PrivilegesLevelModel } from "./privilegesLevelModel";

describe("testing PrivilegesLevelModel", function() {
  it("sviluppatore is allowed at abilitato's level", function() {
    const userLevel = new PrivilegesLevelModel({
      level: 1,
      key: "sviluppatore"
    });
    const abilitato = new PrivilegesLevelModel({
      level: 3,
      key: "test abilitato"
    });
    expect(userLevel.isAllowed(abilitato)).toBe(true);
  });
  it("abilitato is not allowed at sviluppatore's level", function() {
    const sviluppatore = new PrivilegesLevelModel({
      level: 1,
      key: "sviluppatore"
    });

    const abilitato = new PrivilegesLevelModel({
      level: 3,
      key: "test abilitato"
    });
    expect(abilitato.isAllowed(sviluppatore)).toBe(false);
  });
});
