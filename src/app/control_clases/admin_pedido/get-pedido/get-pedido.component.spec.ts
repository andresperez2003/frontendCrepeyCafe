import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetPedidoComponent } from './get-pedido.component';

describe('GetPedidoComponent', () => {
  let component: GetPedidoComponent;
  let fixture: ComponentFixture<GetPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetPedidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
