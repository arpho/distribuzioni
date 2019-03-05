import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistribuzioneDetailPage } from './distribuzione-detail.page';

describe('DistribuzioneDetailPage', () => {
  let component: DistribuzioneDetailPage;
  let fixture: ComponentFixture<DistribuzioneDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistribuzioneDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistribuzioneDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
