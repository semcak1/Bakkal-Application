import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriAddFormComponent } from './categori-add-form.component';

describe('CategoriAddFormComponent', () => {
  let component: CategoriAddFormComponent;
  let fixture: ComponentFixture<CategoriAddFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriAddFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
