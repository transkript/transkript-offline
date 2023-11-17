import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PaymentReceiptComponent} from './payment-receipt.component';

describe('PaymentReceiptComponent', () => {
  let component: PaymentReceiptComponent;
  let fixture: ComponentFixture<PaymentReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentReceiptComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PaymentReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
