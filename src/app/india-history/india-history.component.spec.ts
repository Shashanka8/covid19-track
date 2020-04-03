import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndiaHistoryComponent } from './india-history.component';

describe('IndiaHistoryComponent', () => {
  let component: IndiaHistoryComponent;
  let fixture: ComponentFixture<IndiaHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndiaHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndiaHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
