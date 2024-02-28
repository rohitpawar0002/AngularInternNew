import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEmpComponent } from './update-emp.component';

describe('UpdateEmpComponent', () => {
  let component: UpdateEmpComponent;
  let fixture: ComponentFixture<UpdateEmpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateEmpComponent]
    });
    fixture = TestBed.createComponent(UpdateEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
