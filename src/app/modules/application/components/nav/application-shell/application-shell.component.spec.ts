import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ApplicationShellComponent} from './application-shell.component';

describe('ApplicationShellComponent', () => {
  let component: ApplicationShellComponent;
  let fixture: ComponentFixture<ApplicationShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationShellComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ApplicationShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
