import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationNavHeaderComponent } from './application-nav-header.component';

describe('ApplicationNavHeaderComponent', () => {
  let component: ApplicationNavHeaderComponent;
  let fixture: ComponentFixture<ApplicationNavHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationNavHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicationNavHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
