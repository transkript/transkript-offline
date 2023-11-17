import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ApplicationFeesComponent} from './application-fees.component';

describe('ApplicationFeesComponent', () => {
  let component: ApplicationFeesComponent;
  let fixture: ComponentFixture<ApplicationFeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationFeesComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ApplicationFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
