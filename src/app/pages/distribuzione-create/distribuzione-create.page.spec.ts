import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { DistribuzioneCreatePage } from "./distribuzione-create.page";
import { RouterTestingModule } from "@angular/router/testing";

describe("DistribuzioneCreatePage", () => {
  let component: DistribuzioneCreatePage;
  let fixture: ComponentFixture<DistribuzioneCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DistribuzioneCreatePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule.withRoutes([])]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistribuzioneCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
