import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeExpnesesFormComponent } from './income-expneses-form.component';

describe('IncomeExpnesesFormComponent', () => {
  let component: IncomeExpnesesFormComponent;
  let fixture: ComponentFixture<IncomeExpnesesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeExpnesesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeExpnesesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
