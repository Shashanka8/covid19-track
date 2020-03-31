import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndiaDataComponent } from './india-data.component';

describe('IndiaDataComponent', () => {
  let component: IndiaDataComponent;
  let fixture: ComponentFixture<IndiaDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndiaDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndiaDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
