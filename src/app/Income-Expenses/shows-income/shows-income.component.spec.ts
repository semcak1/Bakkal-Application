import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowsIncomeComponent } from './shows-income.component';

describe('ShowsIncomeComponent', () => {
  let component: ShowsIncomeComponent;
  let fixture: ComponentFixture<ShowsIncomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowsIncomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowsIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
