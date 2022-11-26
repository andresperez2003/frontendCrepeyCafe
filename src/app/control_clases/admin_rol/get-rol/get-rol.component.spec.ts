import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetRolComponent } from './get-rol.component';

describe('GetRolComponent', () => {
  let component: GetRolComponent;
  let fixture: ComponentFixture<GetRolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetRolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
