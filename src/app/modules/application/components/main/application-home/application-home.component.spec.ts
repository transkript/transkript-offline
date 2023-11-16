import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationHomeComponent } from './application-home.component';

describe('ApplicationHomeComponent', () => {
  let component: ApplicationHomeComponent;
  let fixture: ComponentFixture<ApplicationHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicationHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
