import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetFacturaComponent } from './get-factura.component';

describe('GetFacturaComponent', () => {
  let component: GetFacturaComponent;
  let fixture: ComponentFixture<GetFacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetFacturaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
